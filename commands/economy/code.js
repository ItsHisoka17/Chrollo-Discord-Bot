const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getRandomInt, generateID, realTime } = require('../../utils/utils')
const { loadImage, createCanvas } = require('canvas');
const BaseCommand = require('../../structures/BaseCommand');

class TypeCommand extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'code',
    category: 'Economy',
    description: 'Sends a random code. Type it in the chat to earn!',
    aliases: ['typetext'],
    usage: 'code',
    })
}
async execute(message, client, args){
    let lastTyped = client.db.get(`code_${message.guild.id}_${message.author.id}`)
    let timeout = 60000;
    let time = realTime(timeout - (Date.now() - lastTyped))
    if (lastTyped!==null&&timeout - (Date.now() - lastTyped) > 0) return message.channel.send(new MessageEmbed() .setDescription(`**${message.author.username}**, You can use this command again in **${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let code = generateID(7, {type: 'lettersonly'})
    let amount = getRandomInt(100, 500)
    let canvas = createCanvas(350, 175)
    let ctx = canvas.getContext('2d')
    let image = await loadImage('assets/images/code-bg.jpg')
    ctx.font = '18px Arial'
    ctx.fillStyle = '#186408'
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.fillText(code, 117, 65)
    ctx.beginPath()
    ctx.clip()
    ctx.closePath()
    let em = await message.channel.send(`**First Person To Type The Following Code Down Wins $${amount}**`, new MessageAttachment(canvas.toBuffer(), 'code.png'))
    message.channel.createMessageCollector((m, u) => m.content === code && u.id != client.user.id, {max: 1, time: 20000, dispose: true})
    .on('collect', (m) => {
        if (m.content === code){
            message.channel.send(new MessageEmbed() .setDescription(`**${m.author.username}** Typed the code first and won **💸$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            client.db.add(`balance_${message.guild.id}_${m.author.id}`, amount)
        }
    })
    .on('end', (c) => {
        if (c.size===0){
        em.edit('**No one typed the code. Expired**')
        }
    })
    client.db.set(`code_${message.guild.id}_${message.author.id}`, Date.now())
    setTimeout(async () => {
        let code = generateID(7, {type: 'lettersonly'})
        let amount = getRandomInt(100, 500)
        let canvass = createCanvas(350, 175)
        let ctxx = canvass.getContext('2d')
        let imagee = await loadImage('assets/images/code-bg.jpg')
        ctxx.font = '18px Arial'
        ctxx.fillStyle = '#186408'
        ctxx.drawImage(imagee, 0, 0, canvass.width, canvass.height)
        ctxx.fillText(code, 117, 65)
        ctxx.beginPath()
        ctxx.clip()
        ctxx.closePath()
        let em = await message.channel.send(`**First Person To Type The Following Code Down Wins $${amount}**`, new MessageAttachment(canvass.toBuffer(), 'code.png'))
        message.channel.createMessageCollector((m, u) => m.content === code && u.id != client.user.id, {max: 1, time: 20000, dispose: true})
        .on('collect', (m) => {
            if (m.content === code){
                message.channel.send(new MessageEmbed() .setDescription(`**${m.author.username}** Typed the code first and won **💸$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                client.db.add(`balance_${message.guild.id}_${m.author.id}`, amount)
            }
        })
        .on('end', (c) => {
            if (c.size === 0)em.edit('**No one typed the code. Expired**')
        })
    }, 40000);
}
}
module.exports = TypeCommand;