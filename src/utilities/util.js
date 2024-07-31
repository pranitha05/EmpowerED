import { Snowflake } from 'nodejs-snowflake';
export function generateId() {
    const snowflake = new Snowflake({
        workerId: 1,
        epoch: 1597017600000,
    })
    return snowflake.getUniqueID()
}