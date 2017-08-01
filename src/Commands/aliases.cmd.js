const Aliases = require('../Modules/Aliases.js');

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        msg.reply(JSON.stringify(Aliases.aliases[msg.guild.name.toLowerCase()]));
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