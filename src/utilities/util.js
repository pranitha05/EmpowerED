import { Snowflake } from 'nodejs-snowflake';
export function generateId() {
    const snowflake = new Snowflake({
        workerId: 1,
        epoch: new Date().getMilliseconds(),
    })
    return snowflake.getUniqueID()
}