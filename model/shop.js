const db = require('../config/db');

const Shop = db.model('Shop', {
    name: String,
    address: String
});

module.exports = Shop;