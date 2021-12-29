const {Client, Interaction, MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js');
const { messages } = require('../../structures/Config');
const GuildConfig = require('../../structures/GuildConfig');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {

    if (interaction.customId == "ticketBtn") {

        await interaction.deferUpdate();

        const guild = client.guilds.cache.get(interaction.guildId);
        const member = interaction.member;                
        
        const channel = await guild.channels.create(`ticket-${member.user.tag}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                    deny: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                },
                {
                    id: guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
            ],
            parent: interaction.channel.parentId
        });       
        
        let embed = new MessageEmbed()
            .setTitle('Ticket')
            .setDescription(`<@${member.id}> Em breve você sera respondido.\n \n Qual foi o motivo para você abrir um ticket?`)
            .setColor(client.config.colors.ticket)
            .setTimestamp();

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('closeTicketBtn')
                .setLabel('Fechar Ticket')
                .setStyle('DANGER')
                .setEmoji('🔒'),
            
        );
        
        channel.send({embeds: [embed], components: [row]});

    }else if (interaction.customId == "closeTicketBtn"){

        await interaction.deferUpdate();        
        
        const member = interaction.member;

        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return interaction.channel.send({content: `${client.config.emojis.error} Você não pode fazer isso!`});

        let embed = new MessageEmbed()
            .setTitle('Obrigado')
            .setDescription("Seu ticket foi fechado. Este canal sera apagado em ``8 segundos``")
            .setColor(client.config.colors.success)
            .setTimestamp();            

        interaction.channel.send({embeds: [embed]});

        setTimeout(() => {
            interaction.channel.delete();
        }, 8000);


    }else if (interaction.customId == "shopBeforePage"){
        await interaction.deferUpdate();
    }else if (interaction.customId == "shopNextPage"){
        await interaction.deferUpdate();
    }else if (interaction.customId == "inviteOn"){

        await interaction.deferUpdate();
        
        const member = interaction.member;
        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

        GuildConfig.blockInvites(interaction.guild.id, true);
        interaction.followUp({
            content: `Bloqueador de convites ativado <:On:915106607082377287> \nOs membros não podem enviar convites de outros servidores!`,
            ephemeral: false
        })

    }else if (interaction.customId == "inviteOff"){
        
        await interaction.deferUpdate();       

        const member = interaction.member;
        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

        GuildConfig.blockInvites(interaction.guild.id, false);                
        interaction.followUp({
            content: `Bloqueador de convites desativado <:Off:915106561339306015> \nOs membros podem enviar convites de outros servidores!`,
            ephemeral: false
        })

    }



}