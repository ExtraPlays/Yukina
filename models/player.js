const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    userID: String,
    stamina: {type: Number, default: 100}
})

module.exports = mongoose.model('Player', PlayerSchema);
