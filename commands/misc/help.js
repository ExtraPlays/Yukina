const {Client, Message, MessageEmbed} = require('discord.js')
const {pagination} = require('reconlx');
const GuildConfig = require('../../structures/GuildConfig');

module.exports = {
    name: 'help',
    aliases: ["ajuda"],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {

        let embed1 = new MessageEmbed()
            .setTitle("Precisa de Ajuda?")
            .setColor("PURPLE")
            .addField("Prefixo", `Meu prefixo é \`${await GuildConfig.getServerPrefix(message.guild.id)}\``)
            .setDescription("Caso precise de ajuda sobre um comando específico utilize ``!ajuda <comando>``")
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.member.user.tag, message.member.user.avatarURL());


        let embed2 = new MessageEmbed()
            .setTitle("Comandos")
            .setDescription("minha lista de comandos")
            .setColor("DARK_PURPLE")
            // .addField("🥳 Diversão:", "hug\nslap\nkiss")
            .addField("💰 Economia:", "coins\nshop\n")
            .addField("🔰 Moderação:", "mute\nclear\nprefix\nsetmute\nsetupticket")
            .addField("🎲 RPG:", "mochila\ntrabalhar\nprofile")            
            .setTimestamp()
            .setFooter(message.member.user.tag, message.member.user.avatarURL());

        const pages = [embed1, embed2];
        pagination({
            author: message.author,
            embeds: pages,
            channel: message.channel
        })

    }
}