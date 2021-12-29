const {Client, Message, Permissions} = require('discord.js')

const Guild = require('../../models/guild.js');
const GuildConfig = require('../../structures/GuildConfig') ;

module.exports = {
    name: 'mute',
    aliases: [],
    permission: Permissions.FLAGS.ADMINISTRATOR,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let mentioned = message.mentions.members.first();        
        if (!mentioned) return message.reply(`${client.config.emojis.error} Este usuario não foi encontrado ☹️`);
        
        let time = parseInt(args[1]);

        if (!time) return message.reply('Você precisa informar o tempo que o usuario vai ficar mutado 🤐')

        let guildConfig = await Guild.findOne({guildID: message.guild.id});        
        let role = message.guild.roles.cache.find(r => r.id === guildConfig.muteRole);       

        if (!role) return message.reply('O cargo de mute não foi definido use ``setmute``');
        
        let channel = message.guild.channels.cache.find(c => c.id === guildConfig.punishmentChannel);                

        mentioned.roles.add(role);        

        var msg = `**Usuário punido:** ${mentioned.user.tag} \n**Punido por:** ${message.author.tag} \n**Motivo:**`

        let embed = new Discord.MessageEmbed();
        embed.setAuthor('Mute')
        embed.setDescription(msg);
        embed.setColor('RED');
        embed.setTimestamp();        
        
        message.delete();

        if (channel){
            channel.send({embeds: [embed]});
        }else {
            message.channel.send(`O canal de avisos para punimentos não foi definido. use \`${guildConfig.guildPrefix}setmutechannel [canal]\` `)
            message.channel.send({embeds: [embed]});
        }
        
        console.log(`[Mute] usuario ${mentioned.id} foi mutado por ${time} segundos`);
        setTimeout(()=>{
            mentioned.roles.remove(role);
            console.log(`[Mute] Acabou o mute do usuario ${mentioned.id}`);
        }, 1000 * time)
        

    }
}
