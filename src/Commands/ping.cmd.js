module.exports = {

    run: function (msg)
    {
        msg.reply("Pong!");
    },

    help: function (msg)
    {
        return 'To use ping just type `!ping` !';
    }

};