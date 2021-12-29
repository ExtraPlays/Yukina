const {Client, Message, MessageEmbed} = require('discord.js')

const Backpack = require('../../models/backpack.js');
const Items = require('../../_json/items.json'); 
 
module.exports = {
    name: 'useitem',
    aliases: ['usaritem', 'uitem', 'usar'],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  
       
        
        const backpack = await Backpack.findOne({userID: message.member.id});

        let itemName = args.join(' ');

        if (backpack.items.length > 0){     
                        
            backpack.items.map(m => {                        

                Items.filter(item => item.id == m.id).map(i => {
                    
                    if (i.name == itemName) {
                        
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

        }else {
            return message.reply('Você não possui nenhum item');
        }        
            

    }
}