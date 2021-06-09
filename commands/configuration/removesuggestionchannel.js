const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class RemoveSuggestions extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'removesuggestionchannel',
    category: 'Configurations',
    description: 'Removes your guild\'s suggestion channel',
    usage: 'removesuggestionchannel',
})
}
async execute(message, client, args) {
        let suggestionCH = db.get(`sch_${message.guild.id}`)
        if (!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new Discord.MessageEmbed()
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setDescription('```Error: Missing permission: MANAGE_SERVER```')
        message.channel.send(embed)
        return;
    }
    if (suggestionCH !== null){
        client.db.delete(`sch_${message.guild.id}`)
        message.channel.send(new MessageEmbed() .setDescription(`:x: <#${suggestionCH.id}> Removed as suggestion channel`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    } else {
        client.db.set(`sch_${message.guild.id}`)
        message.channel.send(new MessageEmbed() .setDescription(`:x: There is no suggestions channel set for this guild`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
}
}

module.exports = RemoveSuggestions;