const {Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')

const GuildConfig = require('../../structures/GuildConfig');

module.exports = {
    name: 'setupticket',
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {          

        const prefix = await GuildConfig.getServerPrefix(message.guild.id);

        if (!args[0]) return message.reply('Informe o ID do Canal.');

        const categoryID = message.guild.channels.cache.get(args[0]);
        if (!categoryID) return message.reply(`${client.config.emojis.error} Canal nao encontrado!`);

        GuildConfig.setTicketCategory(message.guild.id, categoryID.parentId);


        let embed = new MessageEmbed()
            .setTitle(`${client.config.emojis.ticket} Está com algum problema, tem alguma dúvida ou apenas quer falar com a gente?`)
            .setColor(client.config.colors.ticket)
            .setDescription('Então você veio ao lugar certo. Faremos o possível para te responder o mais rápido possível.\n \nClique em ticket')
            .setTimestamp();

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticketBtn')
                    .setLabel('Abrir Ticket')
                    .setStyle('PRIMARY')
                    .setEmoji(client.config.emojis.ticket),
                
            );

        categoryID.send({embeds: [embed], components: [row]});
        message.channel.send(`${client.config.emojis.success} Canal de Ticket foi criado!`)
        

    }
}