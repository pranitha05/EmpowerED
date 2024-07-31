import jwt from "jsonwebtoken";

const secret = process.env.JWT_TOKEN_SECRET;

export const jwtBaseOptions = {
  audience: "empowerED",
  issuer: "empowerED",
  algorithm: "HS256",
  expiresIn: "7d",
};

/**
 * 
 * @param {string} token 
 * @returns { payload: { role: string, id: string }}
 */

export function verifyToken(token) {
  try {
    const content = jwt.verify(token, secret, jwtBaseOptions);
    console.log(content)
    return {
      payload: {
        id: content.payload.id,
        role: content.payload.role,
      },
      success: true,
    };
  } catch (error) {
    console.error(error)
    return { payload: null, success: false };
  }
}
/**
 * 
 * @param {{ payload: { role: string, id: string }}} data 
 * @returns {string}
 */
export function signJsonWebToken(data) {
  console.log(data)
  return jwt.sign(
    {
      payload: data.payload,
    },
    secret,
    jwtBaseOptions
  );
}
