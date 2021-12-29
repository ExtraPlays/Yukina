const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildID: String,
    guildPrefix: String,
    blockInvites: {type: Boolean, default: true},
    muteRole: String,
    punishmentChannel: String,
    logChannel: String,
    logs: {type: Boolean, default: false},
    ticketCategory: String
})

module.exports = mongoose.model("Guild", guildSchema);