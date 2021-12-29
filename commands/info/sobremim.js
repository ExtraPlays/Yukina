const {Client, Message, MessageEmbed} = require('discord.js');
const Profile = require('../../models/Profile');
 
module.exports = {
    name: 'sobremim',
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {

        let description = args.join(" ");
        const member = message.member;

        Profile.findOneAndUpdate({userID: member.id}, {$set: {description: description}}, (err, result) =>{
            if (err) console.log(err);            
            message.channel.send(`Você alterou sua descrição para \`${description}\``);
        })        

    }
}