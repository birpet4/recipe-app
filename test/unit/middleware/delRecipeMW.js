var expect = require("chai").expect;
var delRecipeMW = require("../../../middleware/recipe/delRecipeMW");

describe("delRecipe middleware", function () {
  it("delete recipe from db", function (success) {
    const mw = delRecipeMW({});

    const resMock = {
      locals: {
        shop: {
          _id: "12345",
        },
        recipe: {
          remove: (cb) => cb(null),
        },
      },
      redirect: (where) => {
        expect(where).to.be.eql(`/shops/12345/recipes`);
        success();
      },
    };

    mw({}, resMock, (err) => {
      success();
    });
  });

  it("next with db error", function (success) {
    const mw = delRecipeMW({});

    const resMock = {
      locals: {
        recipe: {
          remove: (cb) => cb("db error"),
        },
      },
      redirect: (where) => {},
    };

    mw({}, resMock, (err) => {
      expect(err).to.be.eql("db error");
      success();
    });
  });

  it("no recipe in locals", function (success) {
    const mw = delRecipeMW({});

    const resMock = {
      locals: {},
    };

    mw({}, resMock, (err) => {
      success();
    });
  });
});
