var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shops');

module.exports = mongoose;