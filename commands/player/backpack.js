const {Client, Message, MessageEmbed} = require('discord.js')

const Backpack = require('../../models/backpack.js');
const Items = require('../../_json/items.json');
 
module.exports = {
    name: 'backpack',
    aliases: ['mochila', 'moc', 'bag'],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  


        let embed = new MessageEmbed();
        embed.setTitle('🎒 Sua Mochila')        
        embed.setColor('GOLD')
        embed.setTimestamp()
        embed.setFooter(message.member.user.tag, message.member.user.avatarURL())
        
        const backpack = await Backpack.findOne({userID: message.member.id});
        if (!backpack) {
            const newBackpack = new Backpack({
                userID: message.member.id,
                items: [
                    {
                        id: 3,
                        qtd: 1
                    }
                ]                
            })

            await newBackpack.save().catch(err => console.log(err));

            return;
        }

        if (backpack.items.length > 0){     
            embed.setDescription(`📝 Mostrando todos os items da sua mochila
                                  💠 **[${backpack.items.length}/${backpack.size}]**`);       
            backpack.items.map(m => {                        

                Items.filter(item => item.id == m.id).map(i => {
                    embed.addField(`${i.icon} ${i.name} (${m.qtd}x)`, `${i.desc}`)
                });                

            })
        }else {
            embed.setDescription('Voce nao possui nenhum item');
        }

        message.reply({content: 'Para usar algum item use ``!usar <nome do item>``', embeds: [embed]})

        

    }
}