module.exports = {

    run: function (msg, bot)
    {
        msg.reply(`The bot's average ping is ${bot.ping.toFixed(2)}ms`);
    },

    help: function (msg)
    {
        return 'Used to find the bots ping!';
    }

};