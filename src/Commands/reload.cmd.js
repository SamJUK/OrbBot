/*
* Command to reload stuff
*/

const Auth = require('../Modules/Auth.js');
const Cmds = require('../Modules/Commands.js');

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var msgArray = msg.split(" ");
        
        // Missing Params
        if (msgArray.length < 2)
        {
            msg.reply("Missing Parameters");
            return;
        };

        if (msgArray[1].toLowerCase() == "cmds")
        {
            if (!Auth.authorised(msg.author.id, 'Owners'))
            {
                msg.reply('You are not authorised to use this command!');
                return;
            };

            Cmds.setUp();
            msg.reply("Reloaded Commands!");
            return;
        };

        if (msgArray[1].toLowerCase() == "config")
        {
            msg.reply("I dont work (yet)");
            return;
        };
    },

    /**
     * What is display when a user enters !help (this command) in chat
     * 
     * MUST RETURN A STRING 
     */
    help: function (msg)
    {
        return "`!reload cmds` | !reload Config";
    }

};