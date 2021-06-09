const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class ChatChannel extends Command {
    constructor(client){
        super(client, {
            name: 'chatchannel',
            category: 'Configurations',
            description: 'Sets or Removes a channel where you can chat with an AI',
            usage: 'chatchannel <add | remove>'
        })
    }
async execute(message, client, args){
    this.globalMessage(message);
    if (!this.checkPerms(message.member, 'MANAGE_GUILD')) return this.respond(new MessageEmbed() .setDescription('Missing Permissions: Manage Server') .setColor(this.embedColor))
    if (!this.checkBotPerms('MANAGE_WEBHOOKS', 'guild')) return this.respond(new MessageEmbed() .setDescription('I Need The Following Permission: Manage Webhooks') .setColor(this.embedColor))
    let mainEmbed = new MessageEmbed()
    .setTitle('AI Chat Channel')
    .setDescription('**Usage:**\n\n`chatchannel add <channel>` Sets the AI Chat Channel\n`chatchannel remove` Removes the AI Chat Channel')
    .setColor(this.embedColor);
    if (!args[0] || (args[0].toLowerCase() !== 'add' && args[0].toLowerCase() !== 'remove')) return this.inlineReply(mainEmbed);
    if (args[0].toLowerCase() === 'add'){
        if (client.db.get(`chatchannel_${message.guild.id}`)!==null) return this.respond(new MessageEmbed() .setDescription('You already have a Chat Channel setup for this server') .setColor(this.embedColor))
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
        let webhook = await channel.createWebhook('ChatBot', {avatar: client.user.displayAvatarURL()})
        client.db.set(`chatchannel_${message.guild.id}`, {channel: channel, webhook: webhook})
        this.respond(new MessageEmbed() .setDescription(`Channel set to <#${channel.id}> | Webhook Created: **ChatBot**`) .setColor(this.embedColor))
    }
    if (args[0].toLowerCase() === 'remove'){
        if (client.db.get(`chatchannel_${message.guild.id}`)===null) return this.respond(new MessageEmbed() .setDescription('You don\'t have a Chat Channel setup for this server') .setColor(this.embedColor))
        client.db.delete(`chatchannel_${message.guild.id}`)
        this.respond(new MessageEmbed() .setDescription('Chat Channel deleted') .setColor(this.embedColor))
    }
}
}

module.exports = ChatChannel;