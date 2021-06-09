const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Afk extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'afk',
    category: 'Utility',
    description: 'Sets your status to afk',
    usage: 'afk <reason>',
})
}
async execute(message, client, args) {
    let data = client.db;
    data.set(`afk_${message.guild.id}_${message.author.id}`, args.length?args.join(' '):'Unknown')
    data.set(`afkTime_${message.guild.id}_${message.author.id}`, Date.now())
    message.channel.send(new MessageEmbed() .setDescription(`🌙 **${message.author.username}** I have set your status to AFK: ${args.length?args.join(' '):'Unknown...'}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Afk;