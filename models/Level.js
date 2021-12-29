const mongoose = require('mongoose');

// PEGAR O LEVEL PELA QUANTIDADE DE XP.
// xp = 100;
// level = Math.floor(0.1 * Math.sqrt(xp));
// level = 1

// PEGAR O XP PELO LEVEL
// level = 1;
// xp = level * level * 100;
// XP = 100


const levelSchema = new mongoose.Schema({
    userID: String,
    guildID: String,
    xp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    lastUpdated: {type: Date, default: new Date()}
});

module.exports = mongoose.model("Levels", levelSchema);