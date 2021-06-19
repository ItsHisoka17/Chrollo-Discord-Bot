const Command = require('../../structures/BaseCommand');
const { MessageButton, MessageActionRow } = require('discord-buttons')
const { shuffle, sendHttpRequest } = require('../../utils/utils')

class Trivia extends Command {
    constructor(client){
        super(client, {
            name: 'trivia',
            category: 'Fun',
            description: 'Sends a trivia question... can you get the right answer?',
            aliases: [...['quiz']],
            usage: 'trivia'
        })
    }

async execute(message, client, args){

    const { results } = await sendHttpRequest(`https://opentdb.com/api.php?amount=1`);
    let arrAnswers = [results[0].correct_answer, ...results[0].incorrect_answers];
    let answers = shuffle(arrAnswers);
    /**
     * @type {Array<MessageButton>}
     */
    let buttons = [];
    /**
     * @type {Array<MessageActionRow>}
     */
    let rows = [];
    let colors = ['red', 'green', 'blurple', 'grey'];
    let i;

    for (i = 0; i < answers.length; i++){
        let color = colors[i];
        let button = new MessageButton()
        .setLabel(answers[i])
        .setStyle(color)
        .setID(`answer_${i}`);
        buttons.push(button)
    }
    let row = new MessageActionRow()
    .addComponent(buttons[0])
    .addComponent(buttons[1]);
    rows.push(row)
    if (buttons.length>2){
    let row1 = new MessageActionRow()
    .addComponent(buttons[2])
    buttons[3]?row1.addComponent(buttons[3]):client;
    rows.push(row1)
    }

    message.channel.send(`**${results[0].question.replace(/(&quot;|&amp;|&[0-9]*;|#[0-9]*;)/, '')}**`, {
        components: [...rows]
    })
    .then(async function(){
        let attempts = 0;
        client.on('clickButton', function (btn) {
            if (btn.clicker.user.id !== message.author.id) return;
            if (attempts > 0) return;
            attempts++;
            let num = parseInt(btn.id.split('_').pop());
            let correctnum = answers.indexOf(results[0].correct_answer);
            if (correctnum === num){
                btn.reply.send(`**${client.emotes.check} ${btn.clicker.user.username}** Correct Answer!`, true)
            } else {
                btn.reply.send(`${client.emotes.x} **${btn.clicker.user.username}** Incorrect Answer!`, true)
            }
        })
    }).catch(console["log"])


}
}

module.exports = Trivia;