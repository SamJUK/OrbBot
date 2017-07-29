const fs = require('fs');
const Log = require('./Logging.js');

module.exports = {

    /**
     * Parse commands
    */
    commands: [],
    commandsModule: [],

    setUp: function ()
    {
        this.commands = [];
        this.commandsModule = [];

        fs.readdirSync('./Commands/').forEach (file =>{
            // Return if the file begins with double underscroes (__)
            if (file.split(" ")[0].slice(0, 2) == "__")
                return;
            
            Log.console(`Setting up ${file}`, "Commands");
            
            this.commands.push(file.split('.')[0]);
            this.commandsModule.push(require(`../Commands/${file}`));
        });
    },

    parse: function (msg)
    {
        var msgArray = msg.content.split(" ");
        var cmd = msgArray[0].slice(1);

        // Check if it is a valid command
        this.doesCommandExist(cmd);
    },

    doesCommandExist: function (cmd)
    {

    }
};