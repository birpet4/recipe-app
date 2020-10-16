/**
 * Removes a recipe from the database
 * Redirects to /shop/:recipeid after delete
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
