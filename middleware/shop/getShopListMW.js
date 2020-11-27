/**
 * Load all shops from the database
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const ShopModel = requireOption(objectrepository, "ShopModel");

  return function (req, res, next) {
    ShopModel.find({}, (err, shops) => {
      if (err) {
        return next(err);
      }

      res.locals.shops = shops;
      return next();
    });
  };
};
