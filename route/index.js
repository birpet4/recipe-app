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

    // shop related endpoints
    app.get('/shops',
        authMW(objRepo),
        getShopListMW(objRepo),
        renderMW(objRepo, 'index')); 

    app.use('/shops/new',
        authMW(objRepo),
        saveShopMW(objRepo), // in case of get request, skip (next)
        renderMW(objRepo, 'edit-add-shop'));

    app.use('/shops/edit/:shopid',
        authMW(objRepo),
        getShopMW(objRepo),
        saveShopMW(objRepo),
        renderMW(objRepo, 'edit-add-shop'));

    app.get('/shops/del/:shopid',
        authMW(objRepo),
        getShopMW(objRepo),
        delShopMW(objRepo));

    app.use('/shops/:shopid/recipes/new',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        saveRecipeMW(objRepo),
        renderMW(objRepo, 'edit-add-recipe'));

    // recipe related enpoints
    app.get('/shops/:shopid/recipes',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        renderMW(objRepo, 'recipe-list'));

    app.get('/shops/:shopid/recipes/:recipeid/details',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        getRecipeMW(objRepo),
        renderMW(objRepo, 'recipe')); 
        
    app.use('/shops/:shopid/recipes/edit/:recipeid',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        getRecipeMW(objRepo),
        saveRecipeMW(objRepo),
        renderMW(objRepo, 'edit-add-recipe'));

    app.get('/shops/:shopid/recipes/del/:recipeid',
        authMW(objRepo),
        getShopRecipeListMW(objRepo),
        getRecipeMW(objRepo),
        delRecipeMW(objRepo));

    app.use('/login', checkPassMW(objRepo), renderMW(objRepo, 'login'));

    // main endpoint
    app.use('/',
        checkPassMW(objRepo),
        renderMW(objRepo, 'index'));
};