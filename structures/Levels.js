const level = require('../models/Level.js');

class Levels {

    /**
    * @param {string} [userId] - Discord user id.
    * @param {string} [guildId] - Discord guild id.
    */
    static async createUser(userID, guildID){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");

        const isUser = await level.findOne({userID: userID, guildID: guildID});
        if (isUser) return false;

        const newUser = new level({
            userID: userID,
            guildID: guildID
        })

        await newUser.save().catch(err => console.log(`Falha ao criar o usuario: ${err}`));

        return newUser;
    }

    /**
    * @param {string} [userId] - Discord user id.
    * @param {string} [guildId] - Discord guild id.
    */
    static async fetch(userID, guildID){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");

        const user = await level.findOne({userID: userID, guildID: guildID});
        
        if (!user) return false;

        return user;
    }

    /**
    * @param {string} [userId] - Discord user id.
    * @param {string} [guildId] - Discord guild id.
    * @param {number} [xp] - Amount XP to add.
    */
    static async addXp(userID, guildID, xp){
        if (!userID) throw new TypeError("userID não foi informado");
        if (!guildID) throw new TypeError("guildID não foi informado");
        if (!xp) throw new TypeError("A quantidade de XP definida não é um numero.");

        const user = await level.findOne({userID: userID, guildID: guildID});
        if (!user) {
            const newUser = new level({
                userID: userID,
                guildID: guildID,
                xp: xp,
                level: Math.floor(0.1 * Math.sqrt(xp))
            })

            await newUser.save().catch(err => console.log(err));        
            
            return (Math.floor(0.1 * Math.sqrt(xp)) > 0);
        }

        user.xp += parseInt(xp, 10);
        user.level = Math.floor(0.1 * Math.sqrt(user.xp));

        await user.save().catch(e => console.log(`Erro ao Adicionar XP: ${e}`) );

        return (Math.floor(0.1 * Math.sqrt(user.xp -= xp)) < user.level);

    }

}

module.exports = Levels;