const {Message, Client, MessageEmbed} = require('discord.js')
const moment = require('moment');
moment.locale('pt-br')
 
module.exports = {
    name: 'userinfo',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.member;        

        let embed = new MessageEmbed();
        embed.setTitle(member.displayName);
        embed.addField('Tag 👤', `\`${member.user.tag}\``, true);
        embed.addField('ID 🖥️', `\`${member.user.id}\``, true);
        embed.addField('Robô 🤖', member.user.bot ? '``Sim``' : '``Não``', false);
        embed.addField('Criado em 📅', `\`${moment(member.user.createdAt).format('DD/MM/Y')} - ${moment(member.user.createdAt, "YYYYMMDD").fromNow()} \``, true);
        embed.addField('Entrou em 📅', `\`${moment(member.joinedAt).format('DD/MM/Y')} - ${moment(member.joinedAt, "YMD").fromNow()} \``, true);
        
        embed.setThumbnail(member.displayAvatarURL());

        embed.setTimestamp();

        message.channel.send({embeds: [embed]});

    }
}