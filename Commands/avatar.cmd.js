module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        // Check if we have needed permissions


        var msgArray = msg.content.split(" ");

        // Missing Parameters
        if (msgArray.length <= 1)
        {
            msg.reply("Missing Parameters!");
            return;
        };

        //
        msg.mentions.users.forEach( usr => {
            msg.reply(usr.avatarURL);
        });
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Get avatar for the users you tag. `!avatar @SamJ`";
    }

};
