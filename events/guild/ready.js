const Discord = require('discord.js');

/**
 * 
 * @param {Discord.Client} client  
 */
module.exports = (client) =>{

    console.log(`Estou online em ${client.guilds.cache.size} servidores.`);  
    
    client.user.setActivity("Use !help", {
        type: "WATCHING",
        url: "https://www.twitch.tv/extraplays1"
    });


}