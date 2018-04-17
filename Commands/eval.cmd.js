const Auth = require('../Modules/Auth.js');
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

        Log.full('eval', `${msg.author.username}(${msg.author.id}) has used eval. Msg: ${msg.content}`);

        if (!Auth.authorised(msg.author.id, 'Owners'))
        {
            msg.reply("You are not authorised to use this command!");
            return;
        }

        // Remove Command (!eval)
        var code = msg.content.split(" ");
        code.splice(0, 1);

        // Try to run the code and return the result
        var outcome;
        try {
            outcome = eval(code.join(" "));
        }
        catch(err)
        {
            outcome = err.message;
        }

        msg.reply('```' + outcome + '```');
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Evaluate Javascript, Limited to Bot Owners. `!eval \"1\" == 1`";
    }

};
