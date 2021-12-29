const {Client, Message, MessageEmbed, Permissions} = require('discord.js')
const Guild = require('../../models/guild.js');
 
module.exports = {
    name: 'setmute',
    aliases: ['smute'],
    permissions: Permissions.FLAGS.MANAGE_MESSAGES,
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {

        message.channel.send("Qual vai ser o cargo de mute? Você tem ``10 segundos`` para responder.")

        const filter = (m) => {
            return m.author.id === message.author.id;
        }

        const collector = message.channel.createMessageCollector({
            filter, 
            max: 1,
            time: 10000
        })

        collector.on('collect', msg => {
            if (msg.content === "cancel") return;

            let role = msg.mentions.roles.first() || msg.guild.roles.cache.find(r => r.id == msg.content);            

            const g = Guild.findOneAndUpdate({guildID: message.guild.id}, {$set: {muteRole: role.id}}, (err, result) => {
                if (err) {
                    console.log(err);
                    return message.send('Algo deu errado');
                }
                
                if (result) {
                    message.channel.send(`Cargo de mute definido em: ${role} `);
                }

            });
            
        })

        collector.on('end', collected => {
            if (collected.size === 0) return message.channel.send("Você demorou muito para responder. A operação foi cancelada!")
        })     

    }
}