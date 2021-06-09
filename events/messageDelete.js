const DeletedMap = new Map();

module.exports.run = async function(client, message){
    if (!message.author || !message.guild || message.author === null || message.guild === null) return;
    DeletedMap.set(`${message.author.id},${message.guild.id}`, {
        channel: message.channel,
        content: message.content,
        author: message.author
    })
};
module.exports.map = DeletedMap;
module.exports.event = 'messageDelete';