const Aliases = require('../Modules/Aliases.js');

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Missing Parameter
        if (msgArray.length <= 1)
        {
            msg.reply('Missing parameters dumb dumb');
            return;
        }

        // Add
        if (msgArray[1].toLowerCase() == "add")
        {
            if (msgArray.length <= 3)
            {
                msg.reply("I need mooorr!");
                return;
            };
            Aliases.add(msg.guild.name, msgArray[2], msgArray[3]);
            return;
        }

        // Remove
        if (msgArray[1].toLowerCase() == "remove")
        {
            if (msgArray.length <= 2)
            {
                msg.reply("I need mooorr!");
                return;
            };
            Aliases.remove(msg.guild.name, msgArray[2]);
            return;
        }

        // List
        if (msgArray[1].toLowerCase() == "list")
        {
            console.log(Aliases.aliases);

            /*
            var aliases = Aliases.aliases[msg.guild.name];
            var msgS = "";

            for (var key in aliases)
            {
                msgS += `${key}: ${aliases.key}\n`;
            }

            msg.reply(msgS);*/

            return;
        }

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