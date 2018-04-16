const Cmds = require('../Modules/Commands.js')

module.exports = {

    run: function (msg)
    {
        // Split the message into an array
        var msgArray = msg.content.split(" ");
        var cmd = msgArray[1];

        // If there are less than 2 paramters return early
        if (msgArray.length < 2)
            return; 

        // If the requested command does not exists return early
        if (Cmds.commands.indexOf(cmd) == -1)
            return;

        var cmdIndex = Cmds.commands.indexOf(msg.content.split(" ")[1]);
        var helpString = Cmds.commandsModule[cmdIndex].help();

        if (helpString != "")
            msg.reply(helpString);
    },

    help: function (msg)
    {
        return "";
    }

};