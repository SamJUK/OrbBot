module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var mentions = msg.mentions.users;
        var wave = ':wave:';

        if (mentions.size > 0)
        {
            msg.channel.send(wave, {reply: mentions.array()[0].id});
        }else{
            msg.reply(wave);
        };
    },

    /**
     * What is display when a user enters !help (this command) in chat
     * 
     * MUST RETURN A STRING 
     */
    help: function (msg)
    {

    }

};