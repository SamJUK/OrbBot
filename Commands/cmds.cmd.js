const Config = require('../Modules/Config.js');
const Cmds = require('../Modules/Commands.js');

const prefix = Config.prefixes;

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var string = "You can use the following commands!\n";
        Cmds.commands.forEach((cmd) => {
            string += `\`${prefix[0]}${cmd}\` `;
        });
        msg.reply(string);
    },

    /**
     * What is display when a user enters !help (this command) in chat
     * 
     * MUST RETURN A STRING 
     */
    help: function (msg)
    {
        msg.reply("`!cmds lists all available commands!`");
    }

};