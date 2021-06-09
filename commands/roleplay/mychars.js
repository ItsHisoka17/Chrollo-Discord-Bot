const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { getRandom } = require('../../utils/utils');

class MyCharacters extends Command{
    constructor(client){
    super(client, {
    name: 'mychars',
    category: 'Fun',
    description: 'Shows your characters collection',
    aliases: ['mycharacters', 'mycollection'],
    usage: 'mychars',
})
}
async execute(message, client, args){
    this.globalMessage(message)
        let i = 1;
        let data = client.db.get(`characters_${message.author.id}`)
        let characters = data!==null&&Array.isArray(data)?
        data
        .slice(0, 15)
        .map(c => `${i++}. **[${c.name}](${c.image?c.image:c.url})**\n`)
        : 'You haven\'t claimed any characters yet. Start by typing `findchar`';
        let characters1 = data!==null&&Array.isArray(data)?
        data.slice(15, 30)
        .map(c => `${i++}. **[${c.name}](${c.image?c.image:c.url})**\n`)
        : 'You haven\'t claimed any characters yet. Start by typing `findchar`';
        if (data.length > 15){
        let embeds = [];
            let embeds1 = new MessageEmbed() 
            .setDescription(characters) 
            .setTitle('Your characters collection') 
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) 
            .setThumbnail(Array.isArray(data)?getRandom(data).image:null) 
            .setColor(this.embedColor);
            let embed = new MessageEmbed()
            .setDescription(characters1)
            .setTitle('Your characters collection') 
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) 
            .setThumbnail(Array.isArray(data)?getRandom(data).image:null) 
            .setColor(this.embedColor);
            embeds.push(embeds1)
            embeds.push(embed)
            this.paginateEmbeds(embeds, 500000)
        } else {
        message.channel.send(new MessageEmbed() .setDescription(characters) .setTitle('Your characters collection') .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setThumbnail(Array.isArray(data)?getRandom(data).image:null) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }
    }
}

module.exports = MyCharacters;