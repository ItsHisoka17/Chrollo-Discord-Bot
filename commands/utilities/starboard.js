const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class StarBoard extends Command {
    constructor(client){
    super(client, {
        name: 'starboard',
        category: 'Utility',
        description: 'Sets, or Removes Startboard for your server',
        usage: 'starboard <set | remove>',
    })
    }
async execute(message, client, args){
    this.globalMessage(message);
    if (!this.checkPerms(message.member, 'MANAGE_GUILD')) return this.respond(new MessageEmbed() .setDescription(`${this.client.emotes.x}Missing Permissions: Manage Server`) .setColor(this.embedColor))

    let mainEmbed = new MessageEmbed() .setTitle('StarBoard') .setDescription('**Usage:**\n\n`starboard set <channel>` Sets the StarBoard channel\n`starboard remove` Removes the Starboard channel') .setColor(this.embedColor);
    if (!args.length || (args[0].toLowerCase() !== 'set' && args[0].toLowerCase() !== 'remove')) return this.inlineReply(mainEmbed);

    if (args[0].toLowerCase() === 'set'){
        let channel = message.mentions.channels.first() || message.guild.members.cache.get(args[1]) || message.channel;
        this.client.db.set(`starboard_${message.guild.id}`, channel)
        this.respond(new MessageEmbed() .setAuthor('StarBoard', client.user.displayAvatarURL()) .setDescription(`StarBoard channel set to <#${channel.id}>`) .setColor(this.embedColor))
    }
    if (args[0].toLowerCase() === 'remove'){
        if (client.db.get(`starboard_${message.guild.id}`) === null) return this.respond(new MessageEmbed() .setAuthor('StarBoard', client.user.displayAvatarURL()) .setDescription('You don\'t have a StarBoard channel setup') .setColor(this.embedColor))
        this.client.db.delete(`starboard_${message.guild.id}`)
        this.respond(new MessageEmbed() .setAuthor('StarBoard', client.user.displayAvatarURL()) .setDescription('Removed StarBoard channel for your server') .setColor(this.embedColor))
    }
}
}

module.exports = StarBoard;