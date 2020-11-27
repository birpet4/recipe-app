/**
 * Load a shop from the database using the :shopid param
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const RecipeModel = requireOption(objectrepository, "RecipeModel");

  return function (req, res, next) {
    if (typeof res.locals.shop === "undefined") {
      return next();
    }

    RecipeModel.find({ _shop: res.locals.shop._id }, (err, recipes) => {
      if (err) {
        return next(err);
      }
      res.locals.recipes = recipes;
      return next();
    });
  };
};
