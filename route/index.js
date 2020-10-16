const renderMW = require('../middleware/renderMW');

// auth
const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');

// shops
const getShopListMW = require('../middleware/shop/getShopListMW');
const getShopMW = require('../middleware/shop/getShopMW');
const saveShopMW = require('../middleware/shop/saveShopMW');
const delShopMW = require('../middleware/shop/delShopMW');

// recipes
const getShopRecipeListMW = require('../middleware/recipe/getShopRecipeListMW');
const getRecipeMW = require('../middleware/recipe/getRecipeMW');
const saveRecipeMW = require('../middleware/recipe/saveRecipeMW');
const delRecipeMW = require('../middleware/recipe/delRecipeMW');

module.exports = function (app) {
    const objRepo = {};

    // main endpoint
    app.use('/',
        checkPassMW(objRepo),
        renderMW(objRepo, 'index'));

    // shop related endpoints
    app.get('/shops',
        authMW(objRepo),
        getShopListMW(objRepo),
        renderMW(objRepo, 'shops')); 

    app.use('/shops/new',
        authMW(objRepo),
        saveShopMW(objRepo), // in case of get request, skip (next)
        renderMW(objRepo, 'shopseditnew'));

    app.use('/shops/edit/:shopid',
        authMW(objRepo),
        getShopMW(objRepo),
        saveShopMW(objRepo),
        renderMW(objRepo, 'shopseditnew'));

    app.get('/shops/del/:shopid',
        authMW(objRepo),
        getShopMW(objRepo),
        delShopMW(objRepo));

    // recipe related enpoints
    app.get('/shops/:shopid/recipes',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        renderMW(objRepo, 'recipes'));

    app.use('/shops/:shopid/recipes/new',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        saveRecipeMW(objRepo),
        renderMW(objRepo, 'recipeditnew'));

    app.use('/shops/:shopid/recipes/edit/:recipeid',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        getRecipeMW(objRepo),
        saveRecipeMW(objRepo),
        renderMW(objRepo, 'recipeditnew'));

    app.get('/shops/:shopid/recipes/del/:recipeid',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        getRecipeMW(objRepo),
        delRecipeMW(objRepo));
};