const {Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')

const Backpack = require('../../models/backpack.js');
const Items = require('../../_json/items.json');
const Economy = require('../../structures/Economy.js');
 
module.exports = {
    name: 'shop',
    aliases: ['loja'],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  

        const coins = await Economy.getMoney(message.member.id, message.guild.id);

        let embed = new MessageEmbed();
        embed.setTitle('🛍 Lojinha')    
        embed.setDescription(`Bem vindo a minha lojinha <:uwucat:915109253549785098> \nOs melhores itens e os melhores precos \n💰 Carteira \`${coins}\``)    
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
        }

        const itensPerPage = 6;
        let currentPage = 1;
        const nextPage = currentPage + 1;
                


        Items.map(item => {

            embed.addField(`${item.icon} ${item.name} \`(ID: ${item.id})\``, `${item.desc}\n💰${item.price}`, false)

        })

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('shopBeforePage')                
                .setStyle('SECONDARY')
                .setEmoji('◀️'),
            new MessageButton()
                .setCustomId('shopNextPage')                
                .setStyle('SECONDARY')
                .setEmoji('▶️'),
            
        );

        message.reply({content: 'Para comprar ``!comprar [id]``', embeds: [embed], components: [row]})

        

    }
}