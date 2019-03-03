module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        if(msg.author.id !== '111106705319841792')
        {
            msg.reply('Fuck off kid, your not the boss of me');
            return false;
        }

        var msgArray = msg.content.split(" ");
        var cnt = Number(msgArray[1]) || 10;
        var wrd = String(msgArray[2]) || "Hi";

        var mentions = msg.mentions.users;
        if (mentions.size > 0)
        {
            for (var idx in mentions.array())
                for(var i = 0; i < cnt; i++)
                    msg.channel.send(wrd, {reply: mentions.array()[idx].id});
        }else{
            msg.reply(wrd);
        }
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
        return "";
    }

};
