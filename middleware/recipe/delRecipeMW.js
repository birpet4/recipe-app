/**
 * Removes a recipe from the database
 * Redirects to /shop/:recipeid after delete
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.recipe === "undefined") {
      return next();
    }

    res.locals.recipe.remove((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect(`/shops/${res.locals.shop._id}/recipes`);
    });
  };
};
