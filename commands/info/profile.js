const {Client, Message, MessageEmbed} = require('discord.js');

const Profile = require('../../models/Profile.js');
const Levels = require('../../structures/Levels.js');
const Economy = require('../../structures/Economy.js');
 
module.exports = {
    name: 'profile',
    aliases: ["perfil"],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {

        const member = message.mentions.members.first() || message.member;

        let embed = new MessageEmbed();

        embed.setAuthor(member.user.tag);
        embed.setThumbnail(member.displayAvatarURL());
        embed.setTimestamp();     
        embed.setColor("PURPLE");

        const user = await Levels.fetch(member.id, message.guild.id);     
        const coins = await Economy.getMoney(member.id, message.guild.id)           

        Profile.findOne({userID: member.id}, (err, result) => {
            if (err) console.log(err);
            if (!result) {
                message.reply('Aguarde um momento, estou criando o seu perfil.')
                const newProfile = new Profile({
                    userID: member.id            
                })
                newProfile.save().catch(err => console.log(err));                
                setTimeout(() => {
                    message.channel.send('Use /profile para ver o seu perfil.')                    
                }, 2000);
            }else{                                                
                // embed.setDescription(`**Sobre mim:** \n \`${result.description}\` \n **Level:** \n \`${user.level} (${user.xp}XP)\``);
                embed.addField('**🚀 Bio**', `\`${result.description}\``, false);
                embed.addField('**🔰 Level**', `\`${user.level} (${user.xp} XP)\``, true);
                embed.addField('**💰 Coins**', `\`${coins}\``, true);
                message.channel.send({embeds: [embed]});
            }            
        })           


    }
}