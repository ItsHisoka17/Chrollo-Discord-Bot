const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/meme/hot/.json?limit=100'
const { getRandomInt } = require('../../utils/utils');
const BaseCommand = require('../../structures/BaseCommand');

class Meme extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'meme',
    category: 'Fun',
    description: 'Sends a meme',
    usage: 'meme',
})
}
async execute(message, client, args) {
        let num = getRandomInt(200, 3000)
        let num1 = getRandomInt(70, 700)
        https.get(url, (result) => {
            let body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                let response = JSON.parse(body)
                let index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    let text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)
                        .setFooter(`❤️${num}  💬${num1}`)
                    message.channel.send(textembed)
                }

                let image = index.preview.images[0].source.url.replace('&amp;', '&')
                let title = index.title
                let link = 'https://reddit.com' + index.permalink
                let subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    const textembed = new Discord.MessageEmbed()
                        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)
                        .setFooter(`❤️${num}  💬${num1}`)
                    message.channel.send(textembed)
                }
                const imageembed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                    .setDescription(`[${title}](${link})`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                    .setFooter(`❤️${num}  💬${num1}`)
                message.channel.send(imageembed)
            }).on('error', function (e) {
                console.error(e)
            })
        })
    }
}

module.exports = Meme;