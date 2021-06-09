const Chrollo = require('./structures/Chrollo')
const client = new Chrollo({partials:['MESSAGE', 'CHANNEL', 'REACTION', 'USER']})
const { joinDir } = require('./utils/utils')
const fs = require('fs');
fs.readdir(joinDir(__dirname, 'events'), (err, files) => {
    if (err) return console.error(err); 
    files.forEach(file => {
        const eventFunction = require(joinDir(__dirname, 'events', file));
        if (eventFunction.disabled) return; 
        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once; 
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }
    });
});
this.dir = __dirname;
client.init()
process.on('warning', (w) => console.warn(w))
process.on('unhandledRejection', (e) => console.error(e))
process.on('uncaughtException', function(e){ console.error(e) });