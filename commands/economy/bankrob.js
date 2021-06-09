const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms')
const BaseCommand = require('../../structures/BaseCommand')

class Bankrob extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'bankrob',
    category: 'Economy',
    description: 'Robs Someones bank account',
    usage: 'bankrob <user>',
})
}
async execute(message, client, args) {
    let db = client.db;
    var responses = ['You Succesfully Robbed', 'You got caught while trying to rob them', 'Oops, you forgot your Ski-Mask. Better luck next time']
    var randomrespone = Math.floor(Math.random () * responses.length)
    var response = String([responses[randomrespone]])
    let balance = db.get(`balance_${message.guild.id}_${message.author.id}`)
    let bank = db.get(`bank_${message.guild.id}_${message.author.id}`)
    let amount = [1000 ,743 ,678]
    let amounts = Math.floor(Math.random () * amount.length)
    let amountt = String(amount[amounts])
    const mention = message.mentions.members.first()
    let timeout = 18000000
    let rob = await db.fetch(`bankrob_${message.guild.id}_${message.author.id}`)
    let time = ms(timeout - (Date.now() - rob));
    if (rob !== null && timeout - (Date.now() - rob) > 0) {
        const noEmbed = new MessageEmbed() .setDescription(`Hmmm Looks like someones thirsty for Crime, But You can rob again in **${time.hours} Hours ${time.minutes} Minutes And ${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)
        return;
      }  
    if (!mention){
        const invalArgs = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Invalid Args: Please Mention someon')
        message.channel.send(invalArgs)
        return;
    }
    let mentionbank = db.get(`bank_${message.guild.id}_${mention.id}`)
    if (balance < 1000){
        const notenough = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`You must have at least **$1000** in your balance to rob someone`); message.channel.send(notenough)
        return;
    }
    if (mentionbank < 300){
        const less = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Come on really? They don\'t even have **$300** in their Bank Account'); message.channel.send(less)
        return;
    }
    db.subtract(`balance_${message.guild.id}_${message.author.id}` ,250)
    if (response === 'You got caught while trying to rob them'){
        const caughtEmbed = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`👮You were caught during the robbery and lost **$600**`); message.channel.send(caughtEmbed)
        db.subtract(`balance_${message.guild.id}_${message.author.id}` ,600)
        db.set(`bankrob_${message.guild.id}_${message.author.id}` ,Date.now())
        return;
    }
    if (response === 'Oops, you forgot your Ski-Mask. Better luck next time'){
        const forgotEmbed = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Oops, you forgot your Ski-Mask. Better luck next time😭'); message.channel.send(forgotEmbed)
        db.set(`bankrob_${message.guild.id}_${message.author.id}` ,Date.now())
        return;
     } 
     if (response === 'You Succesfully Robbed'){
        db.subtract(`bank_${message.guild.id}_${mention.user.id}` ,amountt)
        db.add(`balance_${message.guild.id}_${message.author.id}` ,amountt)
        const robbedEmbed = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`💸You Succefully Robbed **${mention.user.username}** And got **$${amountt}**`); message.channel.send(robbedEmbed)
    }
    db.set(`bankrob_${message.guild.id}_${message.author.id}` ,Date.now())
}
}

module.exports = Bankrob;