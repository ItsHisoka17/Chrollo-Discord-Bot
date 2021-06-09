const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class WithDraw extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'withdraw',
    category: 'Economy',
    aliases: ['with'],
    description: 'Transfers money to balance',
    usage: 'withdraw [amount]',
})
}
async execute(message, client, args) {
    let db = client.db;
    let bank = db.get(`bank_${message.guild.id}_${message.author.id}`)
    if (args[0] === 'all' || args[0] === 'All'){
        db.add(`balance_${message.guild.id}_${message.author.id}` ,bank)
        db.subtract(`bank_${message.guild.id}_${message.author.id}` ,bank)
        message.channel.send(new Discord.MessageEmbed() .setDescription(`💸Withdrew **$${bank}** into your Wallet`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    if (isNaN(args[0]) && !args[0].endsWith('k')){
        message.channel.send(new Discord.MessageEmbed() .setDescription(`**${message.author.username}** Provide A valid number`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
       }
       let money = args[0].endsWith('k')?args[0].replace(/k/, '000'):args[0]
    if (money > bank){
        message.channel.send(new Discord.MessageEmbed() .setDescription(`**${message.author.username}** Sad, but you don't have that much in your Bank Account`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    if (money === 0) return message.channel.send(new Discord.MessageEmbed() .setDescription('You cannot withdraw **$0**') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    db.subtract(`bank_${message.guild.id}_${message.author.id}` ,money)
    db.add(`balance_${message.guild.id}_${message.author.id}` ,money)
    message.channel.send(new Discord.MessageEmbed() .setDescription(`💸Withdrew **$${args[0]}** In to your Wallet`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = WithDraw;