const Guild = require('../models/guild.js');


module.exports = class GuildConfig{

    /**
     * 
     * @param {string} [guildID] - Guild ID
     */
    static async getServerPrefix(guildID){

        let custom;

        const data = await Guild.findOne({guildID: guildID}).catch(err => console.log(err));
        if (data){
            custom = data.guildPrefix;
        }else {
            custom = "!";
        }

        return custom;
    }

    static async fetch(guildID){            

        const data = await Guild.findOne({guildID: guildID}).catch(err => console.log(err));
        
        return data;
    }

    static async setServerPrefix(guildID, prefix){
        Guild.findOneAndUpdate({guildID: guildID}, {$set: {guildPrefix: prefix}}, (err, result) => {
            if (err) {
                console.log(err);                
                return false;
            }
            if (result) {
                return true;
            }
        });
    }

    static async setTicketCategory(guildID, categoryID){
        Guild.findOneAndUpdate({guildID: guildID}, {$set: {ticketCategory: categoryID}}, (err, result) => {
            if (err) {
                console.log(err);                
                return false;
            }
            if (result) {
                return true;
            }
        });
    }

    static async getTicketCategoryID(guildID){                
        return await this.fetch(guildID).ticketCategory;
    }

    static async canSendInvites(guildID){

        const data = await this.fetch(guildID);

        return data.blockInvites;
        
    }

    static async blockInvites(guildID, block){
        Guild.findOneAndUpdate({guildID: guildID}, {$set: {blockInvites: block}}, (err, result) => {
            if (err) console.log(err);            
        });
    }


}