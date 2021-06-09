const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class SetSuggestions extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'setsuggestionchannel',
    category: 'Configurations',
    description: 'Sets suggestion channel for your guild',
    usage: 'setsuggestionchannel [channel]',
})
}
async execute(message, client, args) {
    let suggestionCH = client.db.get(`sch_${message.guild.id}`)
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
        if (!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new MessageEmbed()
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setDescription('```Error: Missing permission: MANAGE_SERVER```')
        message.channel.send(embed)
        return;
    }
    if (suggestionCH !== null){
        client.db.delete(`sch_${message.guild.id}`)
        client.db.set(`sch_${message.guild.id}` ,channel)
        message.channel.send(new MessageEmbed() .setDescription(`✅ Suggestion channel set to <#${channel.id}>`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    } else {
        client.db.set(`sch_${message.guild.id}` ,channel)
        message.channel.send(new MessageEmbed() .setDescription(`✅ Suggestion channel set to <#${channel.id}>`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
}
}

module.exports = SetSuggestions;