const db = require('../config/db');
  
const Schema = require('mongoose').Schema;

const Recipe = db.model('Recipe', {
    _shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
      },
    name: String,
    price: Number,
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }],
    preparation: String
  });

  module.exports = Recipe;