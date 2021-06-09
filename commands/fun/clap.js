const { MessageEmbed } = require("discord.js")
const BaseCommand = require('../../structures/BaseCommand')
const UtilFiles = require("../../utils/utils")
require('../../structures/inreply')

class Clap extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'clap',
    category: 'Fun',
    description: 'Turns your text into claps',
    usage: 'clap [text]',
    })
}
async execute(message, client, args) {
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription('Invalid args, You gotta give me some text to clap') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let text = UtilFiles.shorten((args.join('👏').includes('@everyone') || args.join('👏').includes('@here'))?args.join('👏').replace(/@everyone|@here/, ''):args.join('👏'), {amount: 3000, method: 'loop'})
    message.inreply(text, {allowedMentions: {repliedUser: false}})
}
}

module.exports = Clap;