const mongoose = require('mongoose');

const BackpackSchema = mongoose.Schema({
    userID: String,
    items: Array,
    size: {type: Number, default: 10}
})

module.exports = mongoose.model('Backpack', BackpackSchema);
