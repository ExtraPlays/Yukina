const Money = require('../models/money.js');

module.exports = class Economy{

    static async getMoney(userID, guildID){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");
        
        const user = await Money.findOne({userID: userID, serverID: guildID});
        if (!user) {

        }        

        return parseInt(user.money);
    }

    static async addMoney(userID, guildID, qtd){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");
        
        const user = await Money.findOne({userID: userID, serverID: guildID});
        if (!user) {

        }

        user.money += parseInt(qtd, 10);

        await user.save().catch(e => console.log(e));
    }

    static async removeMoney(userID, guildID, qtd){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");
        
        const user = await Money.findOne({userID: userID, serverID: guildID});
        if (!user) {

        }

        user.money -= parseInt(qtd, 10);

        await user.save().catch(e => console.log(e));
    }

}