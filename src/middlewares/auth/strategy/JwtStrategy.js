import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtBaseOptions } from "../../../utilities/jwt.js";
import { db } from "../../../database/index.js";
import { UnauthorizedException } from "../../../utilities/exception.js";

const verify = async (payload, done) => {
    const query = "SELECT role, id FROM `User` WHERE id = ?";
    const [[user]] = await db().query(query, payload.payload.id)
    if(!user) return done(UnauthorizedException())
    return done(null, { id: payload.payload.id, role: payload.payload.role })
}

const jwt = new Strategy({
    issuer: jwtBaseOptions.issuer,
    audience: jwtBaseOptions.audience,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN_SECRET,
}, verify)

passport.use(jwt)