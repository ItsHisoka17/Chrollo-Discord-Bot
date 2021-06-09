const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class AutoHentai extends Command {
    constructor(client){
    super(client, {
        name: 'autohentai',
        category: 'NSFW',
        disabled: true
    })
    }
async execute(message, client, args){
    this.globalMessage(message);
    if (!this.message.channel.nsfw) return this.respond(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(this.embedColor))
    if (!this.checkPerms(message.member, 'MANAGE_GUILD')) return this.respond(new MessageEmbed() .setDescription('Missing Permissons: Manage Server') .setColor(this.embedColor))
    if (!this.checkBotPerms('MANAGE_WEBHOOKS', 'channel')) return this.respond(new MessageEmbed() .setDescription('I\'m Missing the Manage Webhooks Permissions, please enable it and try again') .setColor(this.embedColor))
    let autoHentai = this.client.db.get(`autohentai_${this.message.guild.id}`)
    if (autoHentai === null){
        let webhook = await message.channel.createWebhook('AutoHentai', {avatar: client.user.displayAvatarURL()})
        this.inlineReply(new MessageEmbed() .setAuthor(this.message.author.tag, this.message.author.displayAvatarURL({dynamic: true})) .setDescription(`Successfuly setup AutoHentai for this channel.`) .setColor(this.embedColor))
        this.client.db.set(`autohentai_${this.message.guild.id}`, {id: webhook.id, token: webhook.token})
        await client.loadHentai(client)
    } else {
        this.client.db.delete(`autohentai_${this.message.guild.id}`)
        this.inlineReply(new MessageEmbed() .setAuthor(this.message.author.tag, this.message.author.displayAvatarURL({dynamic: true})) .setDescription(`Successfuly removed AutoHentai for this channel`) .setColor(this.embedColor))
    }
}
}

module.exports = AutoHentai;