module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var mentions = msg.mentions.users;
        var ascii = "(ヘ･_･)ヘ┳━┳";

        if (mentions.size > 0)
        {
          for(var idx in mentions.array())
              msg.channel.send(ascii, {reply: mentions.array()[idx].id});
        }else{
            msg.channel.send(ascii);
        };

    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return 'Unflip a table. `!tableunflip`';
    }

};
