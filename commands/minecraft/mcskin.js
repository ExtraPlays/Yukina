const {Client, Message, MessageEmbed} = require('discord.js')

const GuildConfig = require('../../structures/GuildConfig');
 
module.exports = {
    name: 'mcskin',
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  

        const prefix = await GuildConfig.getServerPrefix(message.guild.id);

        if (!args[0]) return message.channel.send(`Você precisa informar um \`jogador\`! \nexemplo: \`${prefix}mcskin ExtraPlaysBR\``)

        let embed = new MessageEmbed()
            .setTitle(`Skin de ${args[0]}`)
            .setThumbnail(`https://minotar.net/helm/${args[0]}/100.png`)
            .setImage(`https://minotar.net/armor/body/${args[0]}/100.png`)
            .setFooter(message.member.user.tag, message.member.user.avatarURL())
            .setColor("GREEN")
            .setTimestamp();

        message.channel.send({embeds: [embed]});
            

    }
}