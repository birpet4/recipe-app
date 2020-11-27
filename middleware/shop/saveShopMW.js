/**
 * Using POST params update or save a shop to the database
 * Redirects to /shops after success
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const ShopModel = requireOption(objectrepository, "ShopModel");

  return function (req, res, next) {
    const name = req.body.shopName;
    const address = req.body.address;
    console.log(name);
    console.log(address);
    if (typeof name === "undefined" || typeof address === "undefined") {
      return next();
    }

    if (typeof res.locals.shop === "undefined") {
      res.locals.shop = new ShopModel();
    }

    res.locals.shop.name = name;
    res.locals.shop.address = address;

    res.locals.shop.save((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/shops");
    });
  };
};
