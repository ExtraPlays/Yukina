const {Client, Message, MessageEmbed} = require('discord.js')

const GuildConfig = require('../../structures/GuildConfig');
 
module.exports = {
    name: 'mchead',
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  


        const prefix = await GuildConfig.getServerPrefix(message.guild.id);

        if (!args[0]) return message.channel.send(`Você precisa informar um \`jogador\`! \nexemplo: \`${prefix}mchead ExtraPlaysBR\``)

        let embed = new MessageEmbed()
            .setTitle(`Cabeça de ${args[0]}`)
            .setImage(`https://minotar.net/helm/${args[0]}/100.png`)
            .setFooter(message.member.user.tag, message.member.user.avatarURL())
            .setColor("GREEN")
            .setTimestamp();

        message.channel.send({embeds: [embed]});
            

    }
}