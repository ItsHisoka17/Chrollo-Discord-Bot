const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')

class Balance extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'bal',
    category: 'Economy',
    aliases: ['balance'],
    description: 'Shows a User\'s Balance',
    usage: 'bal <user>',
    })
}
async execute(message, client, args) {
    let db = client.db;
    const user = message.mentions.users.first() || message.author;
    let userBal = db.get(`balance_${message.guild.id}_${user.id}`)
    let userbal2 = db.get(`bank_${message.guild.id}_${user.id}`)
    if (userBal === null) userBal = 0
    if (userbal2 === null) userbal2 = 0
    message.channel.send(new MessageEmbed() .setDescription(`💸Wallet: **$${userBal}** \n\n 💸Bank: **$${userbal2}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setAuthor(user.tag ,user.displayAvatarURL({ dynamic: true})))
}
}

module.exports = Balance;