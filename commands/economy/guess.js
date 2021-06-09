const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { getRandomInt, realTime } = require('../../utils/utils');

class Guess extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'guess',
    category: 'Economy',
    description: 'Guesses a number between 1-10',
    usage: 'guess',
})
}
async execute(message, client, args){
    const { add, fetch, set } = client.db;
    let timeout = 30000;
    let lastUsed = await fetch(`guess_${message.guild.id}_${message.author.id}`)
    let lastUsedAt = realTime(timeout - (Date.now() - lastUsed))
    if (lastUsed!==null&&timeout-(Date.now()-lastUsed)>0){
        return message.channel.send(new MessageEmbed() .setDescription(`Puzzlehead? You can guess again in **${lastUsedAt.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
    let amountWonLost = getRandomInt(70,300)
    let num = getRandomInt(1,10)
    message.channel.send(new MessageEmbed() .setDescription('So you wanna play the guessing game? Guess a number between **1 - 10**') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let filter = (m, u) => m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector(filter,{max:1})
    collector.on('collect', (m, u) => {
        if (m.content == num){
            add(`balance_${message.guild.id}_${message.author.id}`,amountWonLost)
            message.channel.send(new MessageEmbed() .setDescription(`💸The number was **${num}!**\n\n**---You Won $${amountWonLost}---**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        } else {
            message.channel.send(new MessageEmbed() .setDescription(`💸The number was **${num}!**\n\n**---You Lost!---**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }
        set(`guess_${message.guild.id}_${message.author.id}`, Date.now())
    })
}
}

module.exports = Guess;