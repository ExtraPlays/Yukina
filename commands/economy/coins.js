const {Permissions, Message, Client, MessageEmbed} = require('discord.js')

const Money = require("../../models/money.js");
 
module.exports = {
    name: 'coins',
    aliases: [],    
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {


        if (args.length == 0){
            Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {

                if (err) console.log(err);
                

                let embed = new MessageEmbed();                
                embed.setColor("RANDOM");                             
                embed.setDescription(`💰 Coins \`${money.money}\``);

                message.channel.send({embeds: [embed]});
    
            });
        }

        if (args[0] === "set"){

            let mentioned = message.mentions.users.first();

            if (!mentioned) {                
                return message.reply(`Usuario não encontrado!`);
            }

            Money.findOneAndUpdate({userID: mentioned.id, serverID: message.guild.id}, {$set: {money: args[2]}}, (err, money) => {

                if (err) console.log(err);

                return message.reply(`Você setou os coins de ${mentioned.tag} para \`${args[2]}\` `)
    
            });

        }


    }
}