export const SnowflakeId = ({
  workerId = DEFAULTS.WORKER_ID,
  epoch = DEFAULTS.EPOCH,
} = {}) => {
  const currentTimestamp = Date.now();

  if (epoch > currentTimestamp) {
    throw new Error(
      `Invalid epoch: ${epoch}, it can't be greater than the current timestamp!`
    );
  }

  let lastTimestamp = -1;
  let sequence = 0;
  const maxSequence = (1 << CONFIG.SEQUENCE_BITS) - 1;

  function generate() {
    let timestamp = Date.now();

    if (timestamp < lastTimestamp) {
      throw new Error("Clock is moving backwards!");
    }

    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1) & maxSequence;
      if (sequence === 0) {
        timestamp = waitUntilNextTimestamp(timestamp);
      }
    } else {
      sequence = 0;
    }

    lastTimestamp = timestamp;

    const timestampOffset = timestamp - epoch;

    const timestampBits = timestampOffset
      .toString(2)
      .padStart(CONFIG.TIMESTAMP_BITS, "0");
    const workerIdBits = workerId
      .toString(2)
      .padStart(CONFIG.WORKER_ID_BITS, "0");
    const sequenceBits = sequence
      .toString(2)
      .padStart(CONFIG.SEQUENCE_BITS, "0");

    const idBinary = `${timestampBits}${workerIdBits}${sequenceBits}`;
    const idDecimal = BigInt("0b" + idBinary).toString();

    return idDecimal.toString();
  }

  return generate();
};

export const waitUntilNextTimestamp = (currentTimestamp) => {
  let nextTimestamp = Date.now();
  while (nextTimestamp <= currentTimestamp) {
    nextTimestamp = Date.now();
  }
  return nextTimestamp;
};

export const DEFAULTS = {
  WORKER_ID: 0,
  EPOCH: 1597017600000, // August 10, 2020 at 00:00:00 UTC
};

export const CONFIG = {
  TIMESTAMP_BITS: 42,
  WORKER_ID_BITS: 10,
  SEQUENCE_BITS: 12,
};

/**
 * pantry with ai
 * - notify user when items are low
 * - ai buy pantry
 */

// advice have a passion, same interested, curious, what happen next