const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Reverse extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'reverse',
    category: 'Fun',
    description: 'Reverses your text',
    usage: 'reverse [text]',
})
}
async execute(message, client, args) {
    if (!args[0]){
        message.channel.send(new MessageEmbed() .setDescription('Invalid Args: I need something to reverse') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    let reversed = args.join(' ').split('').reverse().join(' ')
    message.channel.send(new MessageEmbed() .setDescription(reversed) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Reverse;