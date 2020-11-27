/**
 * Load a shop from the database using the :shopid param
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const ShopModel = requireOption(objectrepository, "ShopModel");

  return function (req, res, next) {
    ShopModel.findOne({ _id: req.params.shopid }, (err, shop) => {
      if (err || !shop) {
        return next(err);
      }

      res.locals.shop = shop;
      return next();
    });
  };
};
