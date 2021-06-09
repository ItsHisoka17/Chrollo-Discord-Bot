const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const exec = require('util').promisify(require('child_process').exec)

class Execute extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'execute',
    category: 'Owner',
    aliases: ['exec'],
    ownerOnly: true,
    })
}
async execute(message, client, args){
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription('Error: Nothing found to execute') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    
    let res = await exec(args.join(' '), {timeout: 60000}).catch(() => {
        message.channel.send(
            new MessageEmbed()
            .addField('Input:', `\`\`\`js\n${args.join(' ')}\`\`\``)
            .addField('Error:', `\`\`\`prolog\nAn Unknown error occured\`\`\``)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
        return;
    })
    if (!res) return;
    message.channel.send(
        new MessageEmbed()
        .addField('Input:', `\`\`\`js\n${args.join(' ')}\`\`\``)
        .addField('Output:', `\`\`\`prolog\n${res.stdout?res.stdout:'No output found'}\`\`\``)
        .addField('Error', `\`\`\`prolog\n${res.stderr?res.stderr:'No errors found'}\`\`\``)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    )
}
}

module.exports = Execute;