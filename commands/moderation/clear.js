const {Client, Message, Permissions} = require('discord.js')
 
module.exports = {
    name: 'clear',
    aliases: [],
    permission: Permissions.FLAGS.MANAGE_MESSAGES,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('Você precisa ter a permissão ``MANAGE_MESSAGES`` para usar esse comando.');
        
        message.delete();

        var qtd = parseInt(args[0]);
        if (qtd > 99) return message.channel.send('Não posso apagar mais de 100 mensagens. 🙅‍♂️');     
        
        const emojiX = client.emojis.cache.get("915106561339306015")
        const emojiOK = client.emojis.cache.get("915106607082377287")
        
        let quantia = 0;

        message.channel.bulkDelete(qtd + 1).then(m => {        
            message.channel.send(`${emojiOK} O chat teve \`${m.size - 1} mensagens\` apagadas por <@${message.author.id}>`)
            quantia = m.size;
        }).catch(err => {
            message.channel.send(`${emojiOK} O chat teve \`${quantia - 1} mensagens\` apagadas por <@${message.author.id}> \n${emojiX} Mensagens com mais de 14 dias não foram apagadas`)
        });
        

    }
}
