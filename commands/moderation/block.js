const {Client, Message, MessageEmbed, Permissions, MessageActionRow, MessageButton} = require('discord.js')
const Guild = require('../../models/guild.js');
const GuildConfig = require('../../structures/GuildConfig');
 
module.exports = {
    name: 'block',
    aliases: [],
    permissions: Permissions.FLAGS.ADMINISTRATOR,
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {

        const data = await GuildConfig.fetch(message.guild.id);

        if (args[0].match(/invite[s]?/gi)){
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('inviteOn')                    
                        .setStyle('SECONDARY')
                        .setEmoji('<:On:915106607082377287>')                    
                        .setDisabled(data.blockInvites ? true : false),
                        
                    new MessageButton()
                    .setCustomId('inviteOff')                
                    .setStyle('SECONDARY')
                    .setEmoji('<:Off:915106561339306015>')                
                    .setDisabled(data.blockInvites ? false : true),
                    
                );
    
                let msg = await message.channel.send({
                    content: `Bloqueador de convites: ${data.blockInvites ?  'Ativado <:On:915106607082377287>' : 'Desativado <:Off:915106561339306015>'}`,
                    components: [row]
                });
                
                setTimeout(()=>{
                    if(msg && msg.deletable) msg.delete();          
                    message.delete()      
                }, 10000)     
        }

    }
}