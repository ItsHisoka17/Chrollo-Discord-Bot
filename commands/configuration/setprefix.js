const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class SetPrefix extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'setprefix',
    category: 'Configurations',
    description: 'Sets the prefix for a server',
    usage: 'setprefix [new prefix]',
})
}
async execute(message, client, args) {
    let db = client.db
    if (!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new Discord.MessageEmbed()
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setDescription('```Error: Missing permission: MANAGE_SERVER```')
      message.channel.send(embed)
      return;
      }
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (!args[0]){
        message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid args, What do you want the new prefix to be?') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    if (args[0].split('').length>4) return message.channel.send(new Discord.MessageEmbed() .setDescription('Prefix cannot be higher than 4 characters') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (prefix !== null){
     db.delete(`prefix_${message.guild.id}`)
    }
    await db.set(`prefix_${message.guild.id}` ,args[0])
    message.channel.send(new Discord.MessageEmbed() .setDescription(`Prefix Set to: \`${args[0]}\``) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setFooter(`Changed by ${message.author.tag}` ,message.author.displayAvatarURL({dynamic: true})))
    .catch(() => {
        message.channel.send(new Discord.MessageEmbed() .setDescription(`Sorry, An error Occured while trying to set the prefix`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    })
}
}

module.exports = SetPrefix;