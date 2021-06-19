const Chrollo = require('./structures/Chrollo')
const client = new Chrollo({partials:['MESSAGE', 'CHANNEL', 'REACTION', 'USER']})
client.init()
process.on('newListener', (l) => console.log(l))
process.on('warning', (w) => console.warn(w))
process.on('unhandledRejection', (e) => console.error(e))
process.on('uncaughtException', function(e){ console.error(e) });