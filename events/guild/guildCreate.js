const Discord = require('discord.js');

const Guild = require('../../models/guild.js');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Guild} guild 
 */
module.exports = (client, guild) =>{

    Guild.findOne({guildID: guild.id}, (err, result) => {
        if (err) console.log(err);
        if (!result){
            const newGuild = new Guild({
                guildID: guild.id, 
                guildPrefix: "!"
            })
            newGuild.save().catch(error => console.log(error));            
        }
    });

    console.log(`[!] Entrei no serivodor ${guild.name} - ${guild.id}`);
    console.log(`[!] OwnerID: ${guild.ownerId}`);

}