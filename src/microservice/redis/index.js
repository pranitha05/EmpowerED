import { compareSync } from "bcrypt";
import { createClient } from "redis";
import { db } from "../database/index.js";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect();

async function a() {
  let k = await redisClient.keys();
  console.log(k);
}

export async function cacheCredentials() {
    const [credentials] = await db().query("SELECT * FROM `Credential`");
    await Promise.all(credentials.map(async (credential) => {
        await redisClient.setEx(credential.email, 6.048e+8, JSON.stringify(credential));
    }));
}


/**
 * Validate cache for a given key
 * @param {string} key
 * @param {function} decrypt - Function to decrypt the email
 * @returns {Promise<{ id: string, email: string, password: string, userId: string }>}
 */
export async function validateCache(key) {
   const cache =  JSON.parse(await redisClient.get(key));
   if(!cache) cache = this
   console.log(cache)
}