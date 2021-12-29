const {Client, Message, Permissions, MessageEmbed} = require('discord.js')

const GuildConfig = require('../../structures/GuildConfig');
 
module.exports = {
    name: 'config',
    aliases: [],
    permission: Permissions.FLAGS.ADMINISTRATOR,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const data = await GuildConfig.fetch(message.guild.id);

        const options = {
            invites: data.blockInvites ? `<:On:915106607082377287>` : `<:Off:915106561339306015>`,
            muteRole: message.guild.roles.cache.get(data.muteRole) ? `<:On:915106607082377287>` : `<:Off:915106561339306015>`,
            punishmentChannel: message.guild.channels.cache.get(data.punishmentChannel) ? `<:On:915106607082377287>` : `<:Off:915106561339306015>`            
        }
        
        let embed = new MessageEmbed();
        embed.setTitle(`Configurações do Bot`);
        embed.addField(`Bloqueador de convites: ${options.invites}`, 'use !config invites');
        embed.addField(`Mute: ${options.muteRole}`, 'use !config muterole <cargo>');
        embed.addField(`Avisos: ${options.punishmentChannel}`, 'use !config warnChannel <canal>');

        message.channel.send({embeds: [embed]})

    }
}
