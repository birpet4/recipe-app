/**
 * Load a recipe from the database using the :recipeid param
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const RecipeModel = requireOption(objectrepository, "RecipeModel");
  return function (req, res, next) {
    if (typeof res.locals.shop === "undefined") {
      return next();
    }

    RecipeModel.findOne({ _shop: res.locals.shop._id }, (err, recipe) => {
      if (err) {
        return next(err);
      }
      res.locals.recipe = recipe;
      return next();
    });
  };
};
