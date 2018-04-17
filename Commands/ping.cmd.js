module.exports = {

    run: function (msg, bot)
    {
        msg.reply(`The bot's average ping is ${Math.round(bot.ping)}ms`);
    },

    help: function (msg)
    {
        return 'Used to find the bots ping! `!ping`';
    }

};
