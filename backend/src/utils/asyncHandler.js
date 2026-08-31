// Wraps an async Express route/controller so rejected promises are
// forwarded to the centralized error handler instead of crashing the process.
module.exports = function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
