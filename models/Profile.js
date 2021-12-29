const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    userID: String,
    description: {
        type: String,
        default: 'Use /sobremim <msg> para editar essa mensagem.'
    }

});

module.exports = mongoose.model("Profile", ProfileSchema);