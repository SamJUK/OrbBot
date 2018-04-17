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
            for(var idx in mentions.array())
              msg.channel.send(wave, {reply: mentions.array()[idx].id});
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
      return "Wave at the users you tag `!wave @sam#000`";
    }

};
