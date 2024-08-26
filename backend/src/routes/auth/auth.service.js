import { hashSync } from "bcrypt";
import { db } from "../../microservice/database/index.js";
import { cipher, SnowflakeId, decipher } from "../../utilities/util.js";
import { signJsonWebToken } from "../../utilities/jwt.js";
import { validateCache, redisClient } from "../../microservice/redis/index.js";

const connection = db();
export class AuthService {
  static #SALT = Number(process.env.SALT);
  static async registerUser({ email, password, firstName, lastName }) {
    const encrypt = cipher(process.env.SALT_PASS);
    const decrypt = decipher(process.env.SALT_PASS);
    const [
      emailEncrypted,
      passwordEncrypted,
      firstNameEncrypted,
      lastNameEncrypted,
    ] = [
      encrypt(email),
      hashSync(password, this.#SALT),
      hashSync(firstName, this.#SALT),
      hashSync(lastName, this.#SALT),
    ];

    const cache = await validateCache(emailEncrypted, decrypt);
   // console.log(cache)
    // if (cache) {
    //   return true;
    // } else {
    //   const [existingUsers] = await connection.query(
    //     "SELECT email FROM `Credential`"
    //   );
    //   const isEmailRegistered = existingUsers.find(
    //     (user) => decrypt(user.email) === email
    //   );
    //   if (isEmailRegistered) return true;
    //   redisClient.setEx(isEmailRegistered.id, 6.048e8, JSON.stringify(isEmailRegistered));
    // }

    const userId = SnowflakeId().toString();
    const credId = SnowflakeId().toString();
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
    // await redisClient.setEx(
    //   emailEncrypted,
    //   6.048e8,
    //   JSON.stringify({
    //     userId,
    //     firstNameEncrypted,
    //     emailEncrypted,
    //     lastNameEncrypted,
    //     credId,
    //   })
   //);
    // return false;
  }

  static async signToken(userId) {
    const [[user]] = await db().query(
      "SELECT role, id FROM `User` WHERE id = ?",
      [userId]
    );
    if (!user) return null;
    const token = signJsonWebToken({ payload: user });
    return token;
  }
}
