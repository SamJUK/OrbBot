const Ranks = require('../Modules/Ranks.js');

module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");
        var guildName = msg.guild.name.toLowerCase();

        // Missing parameters
        if (msgArray.length <= 1)
        {
            msg.reply("I need more parameters!");
            return;
        };

        // Switch on the parameters
        switch (msgArray[1]) {
            case "me":
                    Ranks.rank(msg, guildName, msg.author);
                break;
            case "promote":
                    Ranks.promote(msg, guildName, msg.author);
                break;
            case "demote":
                    Ranks.demote(msg, guildName, msg.author);
                break;
            case "ranks":
                    Ranks.ranks(msg, guildName);
                break;
            case "set":
                    var mentions = msg.mentions.users;
                    if (mentions.size < 0)
                    {
                        msg.reply("Please mention the user you want to set the rank of.");
                        return;
                    }
                    var rank = msgArray[3];
                    Ranks.set(msg, guildName, mentions.array()[0], rank);
                break;
            case "list":
                    Ranks.list(msg);
                break;
            default:
                msg.reply("Give me something i know! :thinking:");
                break;
        }

    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return `Manage Server Ranks \n
        \`!rank [cmd]\` \n
        Valid cmds are: \n
        me \n
        promote \n
        demote \n
        ranks \n
        set \n
        list
      `;
    }

};
