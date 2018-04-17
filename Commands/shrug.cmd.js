module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var mentions = msg.mentions.users;
        var shruggie = '¯\\\_(ツ)\_/¯';

        if (mentions.size > 0)
        {
            for (var idx in mentions.array())
              msg.channel.send(shruggie, {reply: mentions.array()[idx].id});
        }else{
            msg.reply(shruggie);
        };
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "JUST SHRUG IT OFF `!shrug`";
    }

};
