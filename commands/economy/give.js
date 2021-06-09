const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Give extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'give',
    category: 'Economy',
    description: 'Gives someone money',
    usage: 'give [user] [amount]',
})
}
async execute(message, client, args) {
    let db = client.db;
    let userBal = db.get(`balance_${message.guild.id}_${message.author.id}`)
    const mention = message.mentions.members.first()
    if (!mention){
        message.channel.send(new Discord.MessageEmbed() .setDescription('```Invalid Args: Please Mention Someone```') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    if (!args[1] || isNaN(args[1]) && !args[1].endsWith('k')){
    message.channel.send(new Discord.MessageEmbed() .setDescription('```Invalid Args: Please put a Valid number```') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    return;
    }
    let money = args[1].endsWith('k')?args[1].replace(/k/, '000'):args[1]
    if (money > userBal){
        const noembed = new Discord.MessageEmbed() .setDescription(`**${message.author.username}** Your not that rich!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noembed)
        return;
    }
    db.set(`balance_${message.guild.id}_${message.author.id}` ,userBal - money)
    db.add(`balance_${message.guild.id}_${mention.user.id}` ,money)
    const doneembed = new Discord.MessageEmbed() .setDescription(`Succesfully gave **$${args[1]}** to **${mention.user.username}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(doneembed)
}
}

module.exports = Give;