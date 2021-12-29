const {Client, Message, MessageEmbed} = require('discord.js')

const Items = require('../../_json/items.json');
const Backpack = require('../../models/backpack.js');
 
module.exports = {
    name: 'fish',
    aliases: ['pescar'],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  
                    
        Backpack.items.map(m => {                        

            Items.filter(item => item.id == m.id).map(i => {
                
                if (i.name == "Vara de Pesca") {
                    
                    //  1 == equipavel | 2 == consumivel
                    switch(i.type){
                        case 1:
                            message.reply('Este item nao pode ser usado')
                            break;
                        case 2:
                            message.reply(`Usou ${i.name}`)
                            // 
                            // TERMINAR ======================
                            // 
                            break;
                        default:
                            message.reply('Este item nao pode ser usado')
                            break;
                    }
                }

            });                                  

        })


    }
}