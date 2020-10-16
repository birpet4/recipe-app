/**
 * Removes a shop from the database
 * Redirects to /shops after delete
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
