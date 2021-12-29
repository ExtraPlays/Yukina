const { Message, Client} = require("discord.js");

const Money = require('../../models/money.js');

const Levels = require('../../structures/Levels.js');
const GuildConfig = require("../../structures/GuildConfig.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    

    if (message.author.bot) return;
    if (message.channel.type == 'DM') return;        

    Levels.createUser(message.member.id, message.guild.id);

    let randomXP = Math.round(Math.random() * 25);

    Levels.addXp(message.member.id, message.guild.id, parseInt(randomXP));

    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {

        if (err) console.log(err);

        if (!money) {
            const newMoney = new Money({
                userID: message.author.id,
                serverID: message.guild.id,
                money: 0
            });
            newMoney.save().catch(err => console.log(err));
        }
    });

    const regexp = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gim

    const canSend = await GuildConfig.canSendInvites(message.guild.id);

    if (canSend && message.content.match(regexp)){        
        message.delete()
        message.channel.send(client.config.messages.invites);        
    }

    const p = await GuildConfig.getServerPrefix(message.guild.id);

    if (!message.content.toLowerCase().startsWith(p.toLowerCase())) return;

    const args = message.content.trim().slice(p.length).split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));

    if (!cmd) return;

    try {
        
        if (cmd.permission != undefined && !message.member.permissions.has(cmd.permission)) return message.reply(`${client.config.messages.noPermission}`);        
        cmd.run(client, message, args);
        console.log(`[INFO] O comando (${cmd.name}) foi utilizado por ${message.author.tag} no servidor (${message.guild.name} - ${message.guild.id})`);        

    }catch (err){
        console.log(err);
    }
    

}
