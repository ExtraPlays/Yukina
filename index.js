require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_BANS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', '']});
const fs = require('fs');
const Config = require('./structures/Config');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
client.config = Config;

fs.readdirSync('./commands/', ).forEach(folders => {
    
    const commands = fs.readdirSync(`./commands/${folders}`).filter(file => file.endsWith('.js'));

    for (let file of commands){

        let cmd = require(`./commands/${folders}/${file}`);

        if (cmd.name) client.commands.set(cmd.name, cmd);
        if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(a => client.aliases.set(a, a.name));
    }
    
});

fs.readdirSync('./events/').forEach(folders => {

    const events = fs.readdirSync(`./events/${folders}`).filter(file => file.endsWith('.js'));
    for (const file of events){
        const eventName = file.split(".")[0];
        const event = require(`./events/${folders}/${file}`);
        client.on(eventName, event.bind(null, client));
    }

});

client.login(process.env.TOKEN);