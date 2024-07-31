import { UnauthorizedException } from "../../../utilities/exception.js";
import { DEFAULT_CONSTANTS } from "../../../utilities/constants.js";
import { verifyToken } from "../../../utilities/jwt.js";
import * as express from "express";

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {void}
 */
export function validateJWTMiddleware(req, res, next) {
  if (!req.headers.authorization) return res.send(UnauthorizedException());
  const [type, code] = req.headers.authorization.trim().split(" ");
  if (!code || type !== DEFAULT_CONSTANTS.AUTH_TYPE)
    return res.send(UnauthorizedException());
  const verify = verifyToken(code);
  if (!verify.success) return res.send(UnauthorizedException());
  next();
}
