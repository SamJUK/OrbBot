const fs = require('fs-extra');

module.exports = {

    logTypes: ["all", "commands", "chat"],

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        if (msgArray.length <= 1)
        {
            msg.reply("Missing Parameters");
            return;
        };

        // Is vaild log type
        if (this.logTypes.indexOf(msgArray[1].toLowerCase()) == -1)
        {
            msg.reply("I do not have those logs!");
            return;
        };

        if (msgArray[1].toLowerCase() == "all")
        {
            this.logTypes.forEach( file => {
                if (file == "all")
                    return;
                this.sendLog(msg, file);
            });
            return;
        };

        this.sendLog(msg, msgArray[1].toLowerCase());


    },

    sendLog: function (msg, log)
    {
        if (!fs.existsSync(`./guilds/${msg.guild.name}/logs/${log}.log`))
        {
            msg.reply("Does not exist!");
            return;
        };

        // Send File
        msg.author.send("Here you go", {files: [`./guilds/${msg.guild.name}/logs/${log}.log`]});
    },

    /**
     * What is display when a user enters !help (this command) in chat
     * 
     * MUST RETURN A STRING 
     */
    help: function (msg)
    {
        return "You can request the following logs:\n`all` - This is all the logs\n`commands` - All command logs\n `chat` - All chat logs"
    }

};