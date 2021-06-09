const { MessageEmbed } = require('discord.js');
const utils = require('../../utils/utils')
const ms = require('parse-ms');
const BaseCommand = require('../../structures/BaseCommand');

class Gamble extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'gamble',
    category: 'Economy',
    description: 'Gambles money',
    usage: 'gamble [amount]',
})
}
async execute(message, client, args) {
    let database = client.db;
    let bal = database.get(`balance_${message.guild.id}_${message.author.id}`)
    let amount = args[0]
    let array = ['won', 'lost']
    let status = utils.getRandom(array)
    let gamble = await database.fetch(`gamble_${message.guild.id}_${message.author.id}`)
    let timeout = 30000;
    let time = ms(timeout - (Date.now() - gamble))
    if (gamble !== null && timeout - (Date.now() - gamble) > 0) return message.channel.send(new MessageEmbed() .setDescription(`Gambling addiction? You can gamble again in **${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (!amount) return message.channel.send(new MessageEmbed() .setDescription('Invalid args, proper usage: `gamble <amount>`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (isNaN(args[0]) && !args[0].endsWith('k')) return message.channel.send(new MessageEmbed() .setDescription('<amount> must be a valid number') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let money = args[0].endsWith('k')?args[0].replace(/k/, '000'):args[0]
    if (bal < money) return message.channel.send(new MessageEmbed() .setDescription('You can\'t gamble more than you have doofus!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (money < 300) return message.channel.send(new MessageEmbed() .setDescription('We don\'t tolerate lowballers, you must gamble at least **$300**'))
    let Gamble = money;
    if (status === 'won'){
        database.add(`balance_${message.guild.id}_${message.author.id}` ,Gamble)
        message.channel.send(new MessageEmbed() .setDescription(`You gambled and won **💸$${money}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        database.set(`gamble_${message.guild.id}_${message.author.id}` ,Date.now())
        return;
    } else {

    if (status === 'lost'){
        database.subtract(`balance_${message.guild.id}_${message.author.id}` ,Gamble)
        message.channel.send(new MessageEmbed() .setDescription(`You gambled and lost **💸$${money}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        database.set(`gamble_${message.guild.id}_${message.author.id}` ,Date.now())
    }
}
}
}

module.exports = Gamble;