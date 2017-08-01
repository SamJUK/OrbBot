const request = require('request');
const Utils = require('./Utils.js');

module.exports = {

    base_url: 'https://www.reddit.com/r/',

    getRandomPost: function (sub, callback, msg) {

        var url = `${this.base_url}${sub}/.json`;
        var passthrough = {};

        request({uri: url, method: 'GET'}, function (error, response, body) {

            var jo = JSON.parse(body);

            var posts = jo.data.children;

            if (posts.length == 0)
            {
                msg.reply("That sub does not exists!");
                return;
            }

            var rndNum = Math.round(Math.random()*posts.length);
            var post = posts[rndNum];
            callback(post);
        });
    },

    getRandomImage: function (sub, callback, msg) {
        this.getRandomPost(sub, post => {
            callback(post.data.url);
        }, msg);
    }

};