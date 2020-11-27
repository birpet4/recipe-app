/**
 * Removes a shop from the database
 * Redirects to /shops after delete
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.shop === "undefined") {
      return next();
    }

    res.locals.shop.remove((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/shops");
    });
  };
};
