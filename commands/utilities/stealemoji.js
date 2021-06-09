const { MessageEmbed, Util } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class StealEmoji extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'stealemoji',
    category: 'Utility',
    description: 'Adds an emoji from another server to this one',
    aliases: ['getemoji'],
    usage: 'stealemoji [emojis]',
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    if (!message.member.hasPermission('MANAGE_EMOJIS')) return this.inlineReply(new MessageEmbed() .setDescription('Missing permissions: Manage Emojis') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (!message.guild.me.hasPermission('MANAGE_EMOJIS')) return this.inlineReply(new MessageEmbed() .setDescription('I\'m Missing the following permissions: Manage Emojis') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription(`Proper Usage: \`stealemoji [emojis]\``) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let emojis = args.filter(e => Util.parseEmoji(e))
    if (!emojis.length) return message.channel.send(new MessageEmbed() .setDescription('Invalid Emojis') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    for (const e of args){
        let emoji = Util.parseEmoji(e)
        if (emoji === null) continue;
        if (!emoji.id) continue;
        message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated?'gif':'png'}?v=1`, emoji.name)
    }
    let mappedEmojis = ``;
    for (const e of args){
    let emoji = Util.parseEmoji(e)
    if (emoji === null) continue;
    if (!emoji.id) continue;
    mappedEmojis += `**[${Util.parseEmoji(e).name}](https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated?'gif':'png'}?v=1)**\n`
    }
    message.channel.send(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setDescription(`**Added the following emojis:**\n\n${mappedEmojis}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
}

module.exports = StealEmoji;