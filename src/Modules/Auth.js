const Config = require('./Config.js');

module.exports = {

    authorised: function (user, role)
    {
        switch (role.toLowerCase()) {
            case "owners":
                if (Config.Owners.indexOf(user.toString()) != -1)
                    return true; 
                break;
            case "admins":
                if (Config.Owners.indexOf(user.toString()) != -1)
                    return true; 
                if (Config.Admins.indexOf(user.toString()) != -1)
                    return true; 
                break;
            case "moderators":
                if (Config.Owners.indexOf(user.toString()) != -1)
                    return true; 
                if (Config.Admins.indexOf(user.toString()) != -1)
                    return true; 
                if (Config.Moderators.indexOf(user.toString()) != -1)
                    return true; 
                break;
        };
        return false;
    },

    // Client = GuildMemeber
    // Perm = Perm Flag as string | https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-flags
    userHasPermission: function (client, perm)
    {
        return (client.hasPermission(perm) != null) ? client.hasPermission(perm) : false;
    },

    // Client = Bot member
    // Guild = Guild
    // Perm = Perm Flag as string | https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-flags
    botHasPermission: function (bot, guild, perm)
    {
        return this.userHasPermission(guild.member(bot.user), perm);
    }

};