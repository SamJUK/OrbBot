module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg, bot)
    {
        var uptimeInSeconds = bot.uptime / 1000;
        var uptimeInMinutes = uptimeInSeconds / 60;
        var uptimeInHours = uptimeInMinutes / 60;
        var uptimeInDays = uptimeInHours / 24;
        var uptimeInWeeks = uptimeInWeeks / 7;

        var uptime = `${Math.round(uptimeInSeconds)}s`;

        if (uptimeInSeconds >= 60 && uptimeInMinutes < 60)
            uptime = `${Math.round(uptimeInMinutes)}m`;

        else if (uptimeInMinutes >= 60 && uptimeInHours < 24)
            uptime = `${Math.round(uptimeInHours)}h`;

        else if (uptimeInHours >= 24 && uptimeInDays < 7)
            uptime = `${Math.round(uptimeInDays)}days`;

        else if (uptimeInDays >= 7)
            uptime = `${Math.round(uptimeInWeeks)}weeks`;


        msg.reply(`The bot's uptime is ${uptime}`);
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