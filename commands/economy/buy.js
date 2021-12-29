const {Client, Message, MessageEmbed} = require('discord.js')

const Items = require('../../_json/items.json');
const Backpack = require('../../models/backpack.js');
const Economy = require('../../structures/Economy.js');

module.exports = {
    name: 'buy',
    aliases: ['comprar', 'c'],
    /**
    *@param {Client} client 
    *@param {Message} message 
    *@param {String[]} args 
    */
    run: async(client, message, args) => {  

        let itemName = parseInt(args[0]);

        const backpack = await Backpack.findOne({userID: message.member.id});

        const coins = await Economy.getMoney(message.member.id, message.guild.id) 

        Items.map(i => {
            
            if (i.id == itemName && i.type == 1) {               
                
                if (coins < i.price) return message.reply(`Você não tem dinheiro pra comprar esse item!`)

                let array = backpack.items;
                let obj = {id: `${i.id}`, qtd: `${1}`}

                for (o in array){
                    
                    if (array[o].id == i.id){
                        return message.reply('Você já possui esse item');                            
                    }

                }                    

                array.push(obj);

                backpack.items = array;

                backpack.save().catch(err => console.log(err))
                
                Economy.removeMoney(message.member.id, message.guild.id, i.price);                                     
                message.reply(`Voce comprou o item \`${i.icon} ${i.name}\` por \`💰${i.price}\` `);   

            }else if (i.id == itemName && i.type == 2){

                if (coins < i.price) return message.reply(`Voce nao tem dinheiro pra comprar esse item`)

                let array = backpack.items;                                              

                for (var k = 0; k < array.length; k++){                        

                    if (array[k].id == itemName){                            
                        
                        array[k].qtd = (parseInt(array[k].qtd) + 1)                            

                        Backpack.findOneAndUpdate({userID: message.member.id}, {$set: {items: array}}, (err, result) => {
                            if (err) console.log(err);
                        });
                                            

                    }else {                        
                        array.push({id: itemName, qtd: 1});                    
                        backpack.save().catch(err => console.log(err));
                        break
                    }
                    
                }                       

                Economy.removeMoney(message.member.id, message.guild.id, i.price);                                     
                message.reply(`Voce comprou o item \`${i.icon} ${i.name}\` por \`💰${i.price}\` `);        
                
            }

        });                                  

        
            

    }
}