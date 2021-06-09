const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Marry extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'marry',
    category: 'Fun',
    description: 'Proposes to marry someone',
    aliases: ['propose'],
    usage: 'marry [user]',
})
}
async execute(message, client, args){
    this.globalMessage(message);
    let marriage = client.db.get(`marriage_${message.guild.id}_${message.author.id}`)
    if (marriage !== null){
        let spouse = marriage.spouse;
        return message.channel.send(new MessageEmbed() .setDescription(`Whoa whoa whoa bud, What are you trying to pull here? You're already married to **${spouse.username}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
    let user = message.mentions.users.first() || client.users.cache.filter(u => message.guild.members.cache.get(u.id)).get(args[0]) || client.users.cache.filter(u => message.guild.members.cache.get(u.id)).find(u => u.username === args[0]);
    if (!user || user.id == message.author.id || user.bot) return message.channel.send(new MessageEmbed() .setDescription('You need to marry a real user who isn\'t yourself... Proper usage: `marry [user]`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    message.channel.send(`<@${user.id}>,`, new MessageEmbed() .setDescription(`**${message.author.username}** Is proposing to marry you! Do you accept? \`y | n\``) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    message.channel.createMessageCollector((m) => m.author.id === user.id && m.content.toLowerCase() == 'y' || m.content.toLowerCase() == 'n', {max: 1, time: 60000})
    .on('collect', (m) => {
        switch(m.content.toLowerCase()){
            case 'y':
                client.db.set(`marriage_${message.guild.id}_${message.author.id}`, {spouse: user, children: [], proposedAt: new Date().toDateString()})
                client.db.set(`marriage_${message.guild.id}_${user.id}`, {spouse: message.author, children: [], proposedAt: new Date().toDateString()})
                message.channel.send(new MessageEmbed() .setDescription(`Congrats! **${message.author.username}** And **${user.username}** are now married!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                break;
            case 'n':
                message.channel.send(`<@${message.author.id}>`, new MessageEmbed() .setDescription(`I'm so sorry... But **${user.username}** denied your proposal`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }
    })
    .on('end', (c) => {
        if (c.size===0){
            this.inlineReply(new MessageEmbed() .setDescription(`**${user.username}** Did not respond in time... Sorry`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }
    })
}
}

module.exports = Marry;