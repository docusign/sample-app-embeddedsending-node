/* eslint-disable no-console */

export default function createPrefixedLogger(prefix) {
  return {
    error(message, data) {
      const logMessage = `ERROR: [${prefix}] ${message}`;
      if (data instanceof Error) {
        console.error(logMessage);
        console.log(data);
        return;
      }
      console.error(logMessage, data);
    },
  };
}
