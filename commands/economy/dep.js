const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')

module.exports = class Deposit extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'dep',
    aliases: ['deposit'],
    description: 'Transfers money to balance',
    category: 'Economy',
    usage: 'dep [amount]',
})
}
async execute(message, client, args) {
    let db = client.db;
    let wallet = db.get(`balance_${message.guild.id}_${message.author.id}`)
    db.get(`bank_${message.guild.id}_${message.author.id}`)
    if (args[0] === 'all' || args[0] === 'All'){
        db.add(`bank_${message.guild.id}_${message.author.id}` ,wallet)
        db.subtract(`balance_${message.guild.id}_${message.author.id}` ,wallet)
        message.channel.send(new Discord.MessageEmbed() .setDescription(`💸Deposited **$${wallet}** Into your Bank Account`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    if (!args[0] || isNaN(args[0]) && !args[0].endsWith('k')){
     message.channel.send(new Discord.MessageEmbed() .setDescription(`**${message.author.username}** Provide A valid number`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
     return;
    }
    let money = args[0].endsWith('k')?args[0].replace(/k/, '000'):args[0]
    if (money > wallet){
        message.channel.send(new Discord.MessageEmbed() .setDescription(`**${message.author.username}** Sad, but you don't have that much in your wallet`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    db.subtract(`balance_${message.guild.id}_${message.author.id}` ,money)
    db.add(`bank_${message.guild.id}_${message.author.id}` ,money)
    message.channel.send(new Discord.MessageEmbed() .setDescription(`💸Deposited **$${args[0]}** Into your Bank Account`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}