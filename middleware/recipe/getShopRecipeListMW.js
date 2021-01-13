/**
 * Load a shop from the database using the :shopid param
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const RecipeModel = requireOption(objectrepository, "RecipeModel");

  return function (req, res, next) {
    RecipeModel.find({}, (err, recipes) => {
      if (err) {
        return next(err);
      }

      res.locals.recipes = recipes;
      return next();
    });
  };
};
