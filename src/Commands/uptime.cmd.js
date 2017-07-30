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

        var uptime = `${uptimeInSeconds}s`;

        if (uptimeInSeconds >= 60)
            uptime = `${uptimeInMinutes}m`;
        else if (uptimeInMinutes >= 60)
            uptime = `${uptimeInHours}h`;
        else if (uptimeInHours >= 24)
            uptime = `${uptimeInHours}days`;
        else if (uptimeInDays >= 7)
            uptime = `${uptimeInHours}weeks`;


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