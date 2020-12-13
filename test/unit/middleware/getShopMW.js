var expect = require("chai").expect;
var getShopMW = require("../../../middleware/shop/getShopMW");

describe("getShopMW middleware", function () {
  it("set res.locals to shop queried from db", function (success) {
    const mw = getShopMW({
      ShopModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: "12345678" });
          cb(null, "shop1");
        },
      },
    });

    const resMock = {
      locals: {},
    };

    mw(
      {
        params: {
          shopid: "12345678",
        },
      },
      resMock,
      (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({ shop: "shop1" });
        success();
      }
    );
  });

  it("call next with error (db error)", function (success) {
    const mw = getShopMW({
      ShopModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: "12345678" });
          cb("error", null);
        },
      },
    });

    const resMock = {
      locals: {},
    };

    mw(
      {
        params: {
          shopid: "12345678",
        },
      },
      resMock,
      (err) => {
        expect(err).to.be.eql("error");
        success();
      }
    );
  });

  it("no shop found in the db", function (success) {
    const mw = getShopMW({
      ShopModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: "12345678" });
          cb(undefined, null);
        },
      },
    });

    const resMock = {
      locals: {},
    };

    mw(
      {
        params: {
          shopid: "12345678",
        },
      },
      resMock,
      (err) => {
        success();
      }
    );
  });
});
