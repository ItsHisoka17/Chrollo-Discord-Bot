const {MessageEmbed, APIMessage} = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')
const { generateID, shorten } = require('../../utils/utils')

class Eval extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'eval',
    category: 'Owner',
    description: 'Evaluates code',
    ownerOnly: true,
})
}
async execute(message, client, args) {
    if (!args[0]){
            const invalArgs = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('```Invalid Args: Nothing Provided to Evaluate```')
            message.channel.send(invalArgs)
            return;
    }
    if (message.content.includes('token')) return message.channel.send(new MessageEmbed() .setDescription(`Your token is: FAKETOKEN${generateID(30, {numbersOnly: false}).toUpperCase()}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
    let toEval = args.join(' ').replace(/(```|```js|js)/ig, '')
    try{
    let evaled = eval(toEval)
    if (typeof evaled !== 'string')
    evaled = require('util').inspect(evaled);
    const evaledembed = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .addFields({
        name: 'Input:',
        value: `\`\`\`js\n ${shorten(toEval, {amount: 1024})}\`\`\``
    },
    {
        name: 'Output:',
        value: `\`\`\`js\n ${shorten(evaled, {amount: 500})} \`\`\``
    },
    {
        name: 'Type:',
        value: `\`\`\`js\n ${typeof(evaled)}\`\`\``
    }
    )
    message.channel.send(evaledembed)
} catch (err) {
    const errorembed = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .addFields({
        name: 'Input:',
        value: `\`\`\`js\n ${toEval}\`\`\``
    },
    {
        name: 'Error:',
        value: `\`\`\`cmd\n ${err} \`\`\``
    },
    )
    message.channel.send(errorembed)
}
}    
}

module.exports = Eval;