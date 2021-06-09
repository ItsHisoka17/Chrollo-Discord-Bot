const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class LoadFile extends Command {
    constructor(client){
    super(client, {
        name: 'loadfile',
        category: 'Owner',
        description: 'Loads a file',
        usage: 'loadfile <file dir>',
        ownerOnly: true,
})
}
async execute(message, client, args){
    this.globalMessage(message);
    this.respond(new MessageEmbed() .setDescription('```prolog\nLoading File...```') .setColor(this.embedColor))
    .then(m => {
    try{
    let file = args.join(' ')
    if (this.client.commands.get(args[1]) || this.client.commands.find(function(a){a.aliases.includes(args[1])})){
        delete require.cache[require.resolve(require('path').join('..', '..', 'commands', args[0], args[1]))]
        let command = client.commands.get(args[1]) || client.commands.find(c => c.aliases.includes(args[1]))
        let reloaded = new (require(`../../commands/${args[0]}/${command.name}.js`))(this.client)
        this.client.commands.delete(command.name)
        this.client.commands.set(command.name, reloaded)
        m.edit(new MessageEmbed() .setDescription(`\`\`\`prolog\nLoaded File: ${require('path').join('..', '..', 'commands', args[0], args[1])}\`\`\``) .setColor(this.embedColor))
        return;
    }
    delete require.cache[require.resolve(`../../${file}`)]
    m.edit(new MessageEmbed() .setDescription(`\`\`\`prolog\nLoaded File: ${file}\`\`\``) .setColor(this.embedColor))
    } catch (e) {
        this.respond(new MessageEmbed() .setDescription(`\`\`\`prolog\nError:\n${e}\`\`\``) .setColor(this.embedColor))
    }
})
}
}

module.exports = LoadFile;