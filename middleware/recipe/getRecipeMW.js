/**
 * Load a recipe from the database using the :recipeid param
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const RecipeModel = requireOption(objectrepository, "RecipeModel");

  return function (req, res, next) {
    RecipeModel.findOne({ _id: req.params.recipeid }, (err, recipe) => {
      if (err || !recipe) {
        return next(err);
      }

      res.locals.recipe = recipe;
      return next();
    });
  };
};
