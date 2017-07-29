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
    }

};