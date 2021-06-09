const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const fetch = require('node-superfetch')
const { getRandom, getRandomInt } = require('../../utils/utils')
require('../../structures/inreply')

class FindChar extends Command{
    constructor(client){
    super(client, {
    name: 'findchar',
    category: 'Fun',
    description: 'Sends available character cards which you can claim',
    aliases: ['character', 'getcharacter', 'findcharacter'],
    usage: 'findchar',
})
}
async execute(message, client, args) {
        let type = getRandom(['anime', 'manga'])
        fetch
        .get(`https://api.jikan.moe/v3/${type}/${getRandomInt(1, 50)}/${type==='manga'?'characters':'characters_staff'}`)
        .then(async function(res){
            if (res.statusText.includes('{"status":404')) return message.inreply('Unable to find any available characters')
            if (!res.ok || res.status === 404) return message.inreply('Unable to find any available characters')
            let char = getRandom(res.body.characters)
            message.channel.send(
                new MessageEmbed()
                .setDescription(`**[${char?char.name:'Unknown'}](${char?char.url:'https://myanimelist.com'})**`)
                .setImage(char.image_url)
                .setFooter('React with any emoji to add this character to your collection')
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
            .then(embed => {
                let filter = (r, u) => r.emoji.name && u.id === message.author.id;
                embed.createReactionCollector(filter, {max: 1})
                .on('collect', async (r, u) => {
                    if (client.db.get(`characters_${u.id}`) > 30) return message.channel.send(`<@${u.id}> You've already reached a maximum of 30 characters`).then(m => {if (m) m.delete({timeout: 10000})})
                    client.db.push(`characters_${u.id}`, { name: char.name, url: char.url, image: char.image_url })
                    await embed.edit(
                        new MessageEmbed()
                        .setDescription(`**[${char.name}](${char.url})**`)
                        .setImage(char.image_url)
                        .setFooter(`Claimed by ${u.username}`)
                        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                    )
                })
            })
        })
    }
}
module.exports = FindChar;