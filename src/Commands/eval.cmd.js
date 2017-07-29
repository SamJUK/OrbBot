const Config = require('../Modules/Config.js');
const Utils = require('../Modules/Utils.js');
const Log = require('../Modules/Logging.js');
const Cmds = require('../Modules/Commands.js');

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var code = msg.content.split(" ");
        code.splice(0, 1);

        var outcome;
        try {
            outcome = eval(code.join(" "));
        }
        catch(err)
        {
            outcome = err.message;
        }

        msg.reply(outcome);
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