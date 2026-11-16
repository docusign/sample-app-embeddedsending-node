const buffer = require('buffer');

if (typeof buffer.SlowBuffer === 'undefined') {
  // eslint-disable-next-line no-empty-function
  function SlowBuffer() {}
  Object.defineProperty(buffer, 'SlowBuffer', {
    value: SlowBuffer,
    writable: true,
    configurable: true,
    enumerable: false,
  });
}
