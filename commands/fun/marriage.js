const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Marriage extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'marriage',
    category: 'Fun',
    description: 'Shows your marriage status',
    usage: 'marriage',
})
}
async execute(message, client, args) {
        if (client.db.get(`marriage_${message.guild.id}_${message.author.id}`) === null) return message.channel.send(new MessageEmbed() .setDescription('Sorry bud, but you\'re not married') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let { spouse, children, proposedAt } = client.db.get(`marriage_${message.guild.id}_${message.author.id}`)
        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`**${message.author.username}'s And ${spouse.username}'s Marriage**\n\nChildren: ${children.length>0?children.map(c => `${c.username}`).join(' '):'No children'}\n\nProposed At: ${proposedAt}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
}

module.exports = Marriage;