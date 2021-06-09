const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { realTime, getRandom } = require('../../utils/utils')

class CoinFlip extends BaseCommand{
constructor(client){
super(client, {
name: 'coinflip',
category: 'Economy',
description: 'Flips a coin',
aliases: ['cf'],
usage: 'coinflip [side] [amount]',
})
}
async execute(message, client, args){
let db = client.db;
let timeout = 60000;
let lastCoinFlip = db.get(`coinflip_${message.guild.id}_${message.author.id}`)
let bal = db.get(`balance_${message.guild.id}_${message.author.id}`)
let time = realTime(timeout - (Date.now() - lastCoinFlip))
if (lastCoinFlip!==null && timeout - (Date.now() - lastCoinFlip) > 0) return message.channel.send(new MessageEmbed() .setDescription(`You can flip a coin again in **${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
if (!args[0]) return message.channel.send(new MessageEmbed() .setDescription('Please provide a side, heads or tails') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
if (args[0] !== 'heads' && args[0] !== 'tails') return message.channel.send(new MessageEmbed() .setDescription('Please provide a side, heads or tails') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
if (!args[1] || args[1] && isNaN(args[1]) && !args[1].endsWith('k') || bal!==null && args[1]>bal) return message.channel.send(new MessageEmbed() .setDescription('Please provide a valid Amount which is not more than how much you have') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
let money = args[1].endsWith('k')?args[1].replace(/k/, '000'):args[1]
if (money>bal) return message.channel.send(new MessageEmbed() .setDescription('Please provide a valid Amount which is not more than how much you have') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
message.channel.send(new MessageEmbed() .setDescription(':coin: The coin flips into the Air...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
.then(m => {
let money = args[1].endsWith('k')?args[1].replace(/k/, '000'):args[1]
let amount = money;
let botSide = getRandom(['heads', 'tails']);
if (botSide===args[0]){
db.add(`balance_${message.guild.id}_${message.author.id}`, amount)
} else {
db.subtract(`balance_${message.guild.id}_${message.author.id}`, amount)
}
setTimeout(function(){
m.edit(new MessageEmbed() .setDescription(`:coin: ${botSide===args[0]?`${args[0]}!! You won **$${amount}**`:`${args[0]==='heads'?'Tails':'Heads'} You lost **$${amount}**`}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
},3000)
db.set(`coinflip_${message.guild.id}_${message.author.id}`, Date.now())
})
}
}

module.exports = CoinFlip;