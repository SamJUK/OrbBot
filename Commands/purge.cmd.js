const Auth = require('../Modules/Auth.js');

module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg, bot)
    {
        if (!Auth.userHasPermission(msg.member, "MANAGE_MESSAGES"))
        {
            msg.reply("You need the manage messages permission to use this command!");
            return;
        };

        if (!Auth.botHasPermission(bot, msg.guild, 'MANAGE_MESSAGES'))
        {
            msg.reply("I cannot do this as i dont have the permissions!");
            return;
        }

        var msgArray = msg.content.split(" ");

        // Only 1 parameter declared, so return early
        if (msgArray.length < 2)
        {
            msg.reply("Missing parameters");
            return;
        };

        var messageCount = parseInt(msgArray[1]);

        // Is not a number or not within clamp range so exit early.
        if (isNaN(messageCount) || messageCount < 1 || messageCount > 100)
        {
            msg.reply("The second parameter must be a number between 1 and 99!");
            return;
        };

        var silent = false;
        if (msgArray.length > 2 && msgArray[2] == "silent")
            silent = true;

        // Purge the messages
        msg.channel.bulkDelete(messageCount + 1).then( () => {
            if (!silent)
                msg.reply("Messages Purged!");
        }).catch( err => {
            msg.reply(`${err.name}: ${err.message}`);
        });
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
        return "Syntax 1: `!purge 10` | 10 = Messages to delete.\nSyntax 2: `!purge 10 silent` | 10 = messages to delete | silent = Not to display a chat message!";
    }

};
