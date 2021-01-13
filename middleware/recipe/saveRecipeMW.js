/**
 * Using POST params update or save a recipe to the database
 * Redirects to /shop/:shopid/recipes after success
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const RecipeModel = requireOption(objectrepository, "RecipeModel");

  return function (req, res, next) {
    var ingredients = [];

    for (var i = 0; i < req.body.ingredientsCounter; i++) {
      var name = req.body["ingredientNum" + i];
      var quantity = req.body["quantityNum" + i];
      var unit = req.body["unitNum" + i];

      if (name && quantity && unit) {
        ingredients.push({
          name: name,
          quantity: parseInt(quantity, 10),
          unit: unit,
        });
      } else {
        next();
      }
    }

    if (
      typeof req.body.recipeName === "undefined" ||
      typeof req.body.preparation === "undefined" ||
      typeof req.body.price === "undefined"
    ) {
      return next();
    }

    if (typeof res.locals.recipe === "undefined") {
      res.locals.recipe = new RecipeModel();
    }

    res.locals.recipe.name = req.body.recipeName;
    res.locals.recipe.price = parseInt(req.body.price, 10);
    res.locals.recipe.preparation = req.body.preparation;
    res.locals.recipe.ingredients = ingredients;

    res.locals.recipe.save((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/recipes`);
    });
  };
};
