const Config = require('../Modules/Config.js');
const Commands = require('../Modules/Commands.js');


module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg, client)
    {
        var msgArray = msg.content.split(" ");

        if(msgArray.length <= 1) {
            msg.reply('Missing parameters, view help with `!help ignorechannel`');
            return false;
        }

        if(msgArray[1] === 'list') {
            var channels = Object.values(Config.ignoredchannels);
            msg.reply(`Ignored Channel ids are ${JSON.stringify(channels)}`);
            return false;
        }

        var addToIgnoreList = true;
        if(msgArray[1] === 'remove') {
            addToIgnoreList = false;
        }

        var channelid = msgArray[2] || msg.channel.id;
        var channelIsIgnored = Config.ignoredchannels.hasOwnProperty(channelid);

        if(addToIgnoreList) {
            if(channelIsIgnored) {
                var channelName = Config.ignoredchannels[channelid];
                msg.reply(`Channel ${channelName} already being ignored`);
                return false;
            }

            var name = Commands.getChannelNameAndServerNameFromId(channelid, client);

            if(name === false) {
                msg.reply(`I don't think im in the server`);
                return false;
            }

            Config.ignoredchannels[channelid] = name;
            msg.reply(`Added channel ${name} to ignore list`);
            return false;
        }

        if (Config.ignoredchannels.hasOwnProperty(channelid)) {
            var name = Config.ignoredchannels[channelid];
            delete Config.ignoredchannels[channelid];
            msg.reply(`Removed channel ${name} from ignore list`);
            return false;
        }
        msg.reply(`That channel is not being ignored ${channelid}`);

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
