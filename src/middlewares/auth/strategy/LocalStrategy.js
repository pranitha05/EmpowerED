import passport from "passport";
import { Strategy } from "passport-local";
import { BadRequest, UnauthorizedException } from "../../../utilities/exception.js";
import { db } from "../../../database/index.js";
import bcrypt from "bcrypt"
const options = {
    passwordFields: "password",
    usernameField: "email",
    passReqToCallback: false
}

/**
 * 
 * @param {Express.Request} _request
 * @param {string} email 
 * @param {string} password 
 * @param {import("passport").DoneCallback} done 
 */
const verify = async (email, password, done) => {
    const connection = db()
    if(!email || !password) return done(UnauthorizedException(), null);
    const [existingUsers] = await connection.query("SELECT email, password, userId FROM `Credential`");
    const isEmailRegistered = existingUsers.find(user => bcrypt.compareSync(email, user.email));

    if(!isEmailRegistered) return done(BadRequest(), null);
    console.log(isEmailRegistered)
    const correctPassword = bcrypt.compareSync(password, isEmailRegistered.password);
    if(correctPassword) return done(null, { id: isEmailRegistered.userId });

    return done(UnauthorizedException())
    
}
const local = new Strategy(options, verify)

passport.use(local)