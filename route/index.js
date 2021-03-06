const renderMW = require("../middleware/renderMW");

// auth
const authMW = require("../middleware/auth/authMW");
const checkPassMW = require("../middleware/auth/checkPassMW");
const logoutMW = require("../middleware/auth/logoutMW");

// shops
const getShopListMW = require("../middleware/shop/getShopListMW");
const getShopMW = require("../middleware/shop/getShopMW");
const saveShopMW = require("../middleware/shop/saveShopMW");
const delShopMW = require("../middleware/shop/delShopMW");

// recipes
const getShopRecipeListMW = require("../middleware/recipe/getShopRecipeListMW");
const getRecipeMW = require("../middleware/recipe/getRecipeMW");
const saveRecipeMW = require("../middleware/recipe/saveRecipeMW");
const delRecipeMW = require("../middleware/recipe/delRecipeMW");

const ShopModel = require("../model/shop");
const RecipeModel = require("../model/recipe");

module.exports = function (app) {
  const objRepo = {
    ShopModel: ShopModel,
    RecipeModel: RecipeModel,
  };

  // shop related endpoints
  app.get(
    "/recipes",
    // authMW(objRepo),
    getShopRecipeListMW(objRepo),
    renderMW(objRepo, "recipe-list")
  );

  app.use(
    "/recipes/new",
    // authMW(objRepo),
    saveRecipeMW(objRepo), // in case of get request, skip (next)
    renderMW(objRepo, "edit-add-recipe")
  );

  app.use(
    "/recipes/edit/:recipeid",
    // authMW(objRepo),
    getRecipeMW(objRepo),
    saveRecipeMW(objRepo),
    renderMW(objRepo, "edit-add-recipe")
  );

  app.get(
    "/recipes/del/:recipeid",
    // authMW(objRepo),
    getRecipeMW(objRepo),
    delRecipeMW(objRepo)
  );

  app.get(
    "/recipes/:recipeid/details",
    // authMW(objRepo),
    getRecipeMW(objRepo),
    renderMW(objRepo, "recipe")
  );

  // app.use(
  //   "/shops/:shopid/recipes/new",
  //   authMW(objRepo),
  //   getShopMW(objRepo),
  //   // getShopRecipeListMW(objRepo),
  //   saveRecipeMW(objRepo),
  //   renderMW(objRepo, "edit-add-recipe")
  // );

  // // recipe related enpoints
  // app.get(
  //   "/shops/:shopid/recipes",
  //   authMW(objRepo),
  //   getShopMW(objRepo),
  //   getShopRecipeListMW(objRepo),
  //   renderMW(objRepo, "recipe-list")
  // );

  // app.get(
  //   "/shops/:shopid/recipes/:recipeid/details",
  //   authMW(objRepo),
  //   getShopMW(objRepo),
  //   getShopRecipeListMW(objRepo),
  //   getRecipeMW(objRepo),
  //   renderMW(objRepo, "recipe")
  // );

  // app.use(
  //   "/shops/:shopid/recipes/edit/:recipeid",
  //   authMW(objRepo),
  //   getShopMW(objRepo),
  //   getShopRecipeListMW(objRepo),
  //   getRecipeMW(objRepo),
  //   saveRecipeMW(objRepo),
  //   renderMW(objRepo, "edit-add-recipe")
  // );

  // app.get(
  //   "/shops/:shopid/recipes/del/:recipeid",
  //   authMW(objRepo),
  //   getShopMW(objRepo),
  //   getShopRecipeListMW(objRepo),
  //   getRecipeMW(objRepo),
  //   delRecipeMW(objRepo)
  // );

  // app.use("/logout", logoutMW(objRepo));

  // // main endpoint
  app.use("/", getShopRecipeListMW(objRepo), renderMW(objRepo, "recipe-list"));
};
