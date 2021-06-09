const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Divorce extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'divorce',
    category: 'Fun',
    description: 'Divorces someone',
    usage: 'divorce',
})
}
async execute(message, client, args){
        if (client.db.get(`marriage_${message.guild.id}_${message.author.id}`) === null) return message.channel.send(new MessageEmbed() .setDescription('You need to be married to divorce someone...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let marriage = client.db.get(`marriage_${message.guild.id}_${message.author.id}`)
        message.channel.send(new MessageEmbed() .setDescription(`Sad day... You divorced **${marriage.spouse.username}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        client.db.delete(`marriage_${message.guild.id}_${marriage.spouse.id}`)
        client.db.delete(`marriage_${message.guild.id}_${message.author.id}`)
    }
}

module.exports = Divorce;