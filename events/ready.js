const chalk = require('chalk');
const Utils = require('../utils/utils')
module.exports = {
    event: 'ready',
async run(client, ready){
    console.log(Object.keys(client.emotes));
    console.log(chalk.green('Connecting to MySQL database...'))
setTimeout(() => {
    console.log(chalk.green(`${client.emotes.check} Connected to MySQL`))
}, 3000);
setTimeout(() => {
console.log(chalk.red('Ready for revenge on the Chain user'))
}, 4000, )
    Utils.setPrecence(client);
    setInterval(() => client.db.set(`newguilds`, 0), 86400000)
    setInterval(() => client.db.set(`commandsused`, 0), 86400000)
    require('../dashboard/app').load(client)
    /*
    await client.loadHentai(client)
    */
}
}