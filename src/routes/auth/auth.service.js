import bcrypt from "bcrypt";
import { db } from "../../database/index.js";
import { generateId } from "../../utilities/util.js";
import { signJsonWebToken } from "../../utilities/jwt.js";

const connection = db();
export class AuthService {
  static #SALT = 12;
  static async registerUser({ email, password, firstName, lastName }) {
    const [
      emailEncrypted,
      passwordEncrypted,
      firstNameEncrypted,
      lastNameEncrypted,
    ] = await Promise.all([
      bcrypt.hash(email, this.#SALT),
      bcrypt.hash(password, this.#SALT),
      bcrypt.hash(firstName, this.#SALT),
      bcrypt.hash(lastName, this.#SALT),
    ]);

    const [existingUsers] = await connection.query("SELECT email FROM `Credential`");
    const isEmailRegistered = existingUsers.some(user => bcrypt.compareSync(email, user.email));
    if(isEmailRegistered) return true;
    const userId = generateId().toString();
    const credId = generateId().toString();
    const credQuery = `INSERT INTO Credential (id, email, password, userId) VALUES (?, ?, ?, ?)`;
    const userQuery = `INSERT INTO User (id, role, firstName, lastName, credentialId) VALUES (?, ?, ?, ?, ?)`;
    await Promise.all([
      await connection.query(credQuery, [
        credId,
        emailEncrypted,
        passwordEncrypted,
        userId,
      ]),
      await connection.query(userQuery, [
        userId,
        "USER",
        firstNameEncrypted,
        lastNameEncrypted,
        credId,
      ]),
    ]);
    return false;
  }

  static async signToken(userId) {
    const [[user]] = await db().query(
      "SELECT role, id FROM `User` WHERE id = ?",
      [userId]
    );
    if(!user) return null;
    const token = signJsonWebToken({ payload: user });
    return token;
  }
}
