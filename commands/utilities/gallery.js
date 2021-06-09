const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Gallery extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'gallery',
    category: 'Utility',
    aliases: ['pictures'],
    description: 'Shows, adds, or removes pictures from your gallery',
    usage: 'gallery <Option> Options: [add | remove]',
})
}
async execute(message, client, args){
    let dataBase = client.db;
    let pictures = dataBase.get(`gallery_${message.guild.id}_${message.author.id}`)!==null&&Array.isArray(dataBase.get(`gallery_${message.guild.id}_${message.author.id}`))?dataBase.get(`gallery_${message.guild.id}_${message.author.id}`):null;
    if (!args[0]){
        let i = 1;
        message.channel.send(new MessageEmbed() .setDescription('Fetching your Gallery...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(fetched => {
            let mainEmbed =
            new MessageEmbed()
            .setTitle('Your Gallery')
            .setDescription(pictures!==null?pictures.slice(0, 7).map(v => `${i++}. ${v}`).join('\n\n'):'You have 0 Pictures')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']));
            fetched.edit(mainEmbed)
            if (pictures!=='You have 0 Pictures' && pictures.length > 7){
                let secondEmbed =
                new MessageEmbed()
                .setTitle('Your Gallery')
                .setDescription(pictures!=='You have 0 Pictures'?pictures.slice(7, 15).map(v => `${i++}. ${v}`).join('\n\n'):'You have 0 Pictures')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']));
                fetched.react('⬅️')
                fetched.react('➡️')
                let slide = 0;
                let embeds = []
                embeds.push(mainEmbed)
                embeds.push(secondEmbed)
                let collector = fetched.createReactionCollector((r, u) => u.id === message.author.id && r.emoji.name === '⬅️' || r.emoji.name === '➡️',{time:300000})
                collector.on('collect', async (r, u) => {
                    if (u.bot) return;
                    switch(r.emoji.name){
                        case '⬅️':
                            if (slide == 0){
                                slide = 1
                            } else {
                                slide--
                            }
                            await fetched.edit(embeds[slide])
                            fetched.reactions.cache.get('⬅️').users.remove(message.author)
                        break;
                        case '➡️':
                            if (slide == 1){
                                slide = 0
                            } else {
                                slide++
                            }
                            await fetched.edit(embeds[slide])
                            fetched.reactions.cache.get('➡️').users.remove(message.author)
                    }
                })
            }
        }).catch((e)=> {
            require('../../utils/utils').sendErrorEmbed(message);
            console.error(e)
        })
    }
    if (args[0] && args[0] === 'add'){
        if (pictures.length === 15) return message.channel.send(new MessageEmbed() .setDescription('You have a maximum of 15 pictures in your gallery') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(function(m){if(m)setTimeout(()=>m.delete,5000)});
        let str = args[1];
        if (!str.match(/https?:\/\/.*\.(?:png|jpg|gif|webp)/)) return message.channel.send(new MessageEmbed() .setDescription('Invalid image url') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(function(m){if(m)setTimeout(()=>m.delete,5000)});
        let arr = [];
        if (dataBase.get(`gallery_${message.guild.id}_${message.author.id}`)===null) {
            arr.push(args[1]);
            dataBase.set(`gallery_${message.guild.id}_${message.author.id}`, arr)
            message.channel.send(new MessageEmbed() .setDescription('Image successfuly added') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        } else {
            await pictures.push(args[1])
            dataBase.set(`gallery_${message.guild.id}_${message.author.id}`, pictures)
            message.channel.send(new MessageEmbed() .setDescription('Image successfuly added') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
        }
    }
    if (args && args[0] === 'remove'){
        if (isNaN(args[1])) return message.channel.send(new MessageEmbed() .setDescription('Thats not a number...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let item = args[1];
        if (args[1] === '1') item = 0;
        if (pictures === 'You have 0 Pictures' || pictures.length < item) return message.channel.send(new MessageEmbed() .setDescription('You don\'t have that many pictures in your gallery doofus!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(function(m){if(m)setTimeout(()=>m.delete,5000)});
        await message.channel.send(new MessageEmbed() .setDescription(`Successfuly removed [The picture](${pictures[item]})`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let picsRemoved = await pictures.filter(element => element !== pictures[item])
        if (picsRemoved.length > 0){
        dataBase.set(`gallery_${message.guild.id}_${message.author.id}`, picsRemoved)
        } else {
            dataBase.delete(`gallery_${message.guild.id}_${message.author.id}`)
        }
    }
}
}

module.exports = Gallery;