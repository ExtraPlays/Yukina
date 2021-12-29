const {Permissions, Message, Client, MessageEmbed} = require('discord.js')

const Guild = require('../../models/guild.js');
 
module.exports = {
    name: 'prefix',
    aliases: [],
    permission: Permissions.FLAGS.ADMINISTRATOR,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        message.channel.send("Qual vai ser o novo prefixo? Você tem ``10 segundos`` para responder.")        

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
            Guild.findOneAndUpdate({guildID: message.guild.id}, {$set: {guildPrefix: msg.content}}, (err, result) => {
                if (err) {
                    console.log(err);
                    return message.send('Algo deu errado');
                }
                if (result) {
                    message.channel.send(`O prefixo foi definido para \`${msg.content}\` `);
                }
            });
        })

        collector.on('end', collected => {
            if (collected.size === 0) return message.channel.send("Você demorou muito para responder. A operação foi cancelada!")
        })
        


    }
}