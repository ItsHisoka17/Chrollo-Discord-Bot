const { createCanvas, loadImage, registerFont } = require('canvas');
const { MessageAttachment } = require('discord.js')
const { realNumber } = require('../utils/utils')

const guildMemberAdd = {
    event: 'guildMemberAdd',
async run(client, gMember){
    let welcoming = client.db.get(`welcoming_${gMember.guild.id}`)
    if (welcoming === null) return;
    let message = welcoming.message;
    let welcomeChannel = client.channels.cache.get(welcoming.channel)
    if (!welcomeChannel) return;
    let member = gMember.user;
    let endNum = realNumber(gMember.guild.memberCount)
    loadImage('https://cdn.wallpapersafari.com/18/74/TjFY4f.jpg').then(background => {
        loadImage(member.displayAvatarURL({format: 'jpg'})).then(avatar => {
            const canvas = createCanvas(600, 300)
            let ctx = canvas.getContext('2d')
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
            registerFont('assets/fonts/Roboto-Bold.ttf', { family: 'Roboto' })
            ctx.font = '29px Roboto'
            ctx.fillStyle = '#d2e3d1'
            ctx.fillText(`Welcome ${member.username}!`, 135, 30)
            ctx.fillText(`You're the ${gMember.guild.memberCount}${endNum} Member!`, 135, 270)
            ctx.beginPath()
            ctx.arc(255, 140, 100, 0, Math.PI * 2, false)
            ctx.closePath()
            ctx.clip()
            ctx.drawImage(avatar, 130, 40, 225, 225)
            welcomeChannel.send(`${message!==null?`<@${member.id}>, ${message}`:`Welcome <@${member.id}>`}`, new MessageAttachment(canvas.toBuffer(), 'test.png'))
        })
    })
}
}

module.exports = guildMemberAdd;