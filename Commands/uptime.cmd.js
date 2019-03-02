module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg, bot)
    {
        var minute = 60, hour = 3600, day = 86400, week = 604800, month = 2419200, year = 29030400;

        var uptimeInSeconds = bot.uptime / 1000;
        var uptimeSegments = {};

        if(uptimeInSeconds > year) {
            var years = Math.floor(uptimeInSeconds/year);
            uptimeInSeconds -= (year*years);
            uptimeSegments['years'] = years;
        }

        if(uptimeInSeconds > month) {
            var months = Math.floor(uptimeInSeconds/month);
            uptimeInSeconds -= (month*months);
            uptimeSegments['months'] = months;
        }

        if(uptimeInSeconds > week) {
            var weeks = Math.floor(uptimeInSeconds/week);
            uptimeInSeconds -= (week*weeks);
            uptimeSegments['weeks'] = weeks;
        }

        if(uptimeInSeconds > day) {
            var days = Math.floor(uptimeInSeconds/day);
            uptimeInSeconds -= (day*days);
            uptimeSegments['days'] = days;
        }

        if(uptimeInSeconds > hour) {
            var hours = Math.floor(uptimeInSeconds/hour);
            uptimeInSeconds -= (hour*hours);
            uptimeSegments['hours'] = hours;
        }

        if(uptimeInSeconds > minute) {
            var minutes = Math.floor(uptimeInSeconds/minute);
            uptimeInSeconds -= (minute*minutes);
            uptimeSegments['minutes'] = minutes;
        }

        uptimeSegments['seconds'] = Math.round(uptimeInSeconds);

        var uptime_str = '';
        for(var prop in uptimeSegments) {
            var time = uptimeSegments[prop];
            uptime_str += `, ${time} ${prop}`;
        }


        uptime_str = uptime_str.substr(2, uptime_str.length-2);
        msg.reply(`The bot's uptime is ${uptime_str}`);
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Get uptime of the bot";
    }

};
