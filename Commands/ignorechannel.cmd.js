const Config = require('../Modules/Config.js');


module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        if(msgArray.length <= 1) {
            msg.reply('Missing parameters, view help with `!help ignorechannel`');
            return false;
        }

        if(msgArray[1] === 'list') {
            var channels = JSON.stringify(Config.ignoredchannels);
            msg.reply(`Ignored Channel ids are ${channels}`);
            return false;
        }

        var addToIgnoreList = true;
        if(msgArray[1] === 'remove') {
            addToIgnoreList = false;
        }

        var channelid = msgArray[2] || msg.channel.id;
        var channelIsIgnored = Config.ignoredchannels.includes(channelid);

        if(addToIgnoreList) {
            if(channelIsIgnored) {
                msg.reply(`Channel ${channelid} already being ignored`);
            }

            Config.ignoredchannels.push(channelid);
            msg.reply(`Added channel ${channelid} from ignore list`);
            return false;
        }

        var channelIndex = Config.ignoredchannels.indexOf(channelid);
        Config.ignoredchannels.splice(channelIndex, 1);
        msg.reply(`Removed channel ${channelid} from ignore list`);
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
        return "Get the bot to ignore commands from a channel by id" +
            "action on of the following (list|add|remove)" +
            "if no channel id is specifed it use current channel" +
            "```" +
            "!ignorechannel {action} {channelid}" +
            "```";
    }

};
