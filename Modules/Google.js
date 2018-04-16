const Utils = require('./Utils.js');
const Logging = require('./Logging.js');
const GoogleImages = require('google-images');

const google = {
    CSE: Utils.readFromFile('./Credentials/google_CSE.token'),
    API: Utils.readFromFile('./Credentials/google_API.token')
};

const googleClient = new GoogleImages(google.CSE, google.API);

module.exports = {

    searchImages: function (phrase, callback, NSFW) {
        var pg = Math.round(Math.random() * 5) + 1;

        //console.log(`Phrase ${phrase}\nSFW: ${NSFW}`);

        googleClient.search(phrase, {size: 'large', page: pg, safe: NSFW})
                    .then(images => {
                        callback(images);
                    })
                    .catch(e => {
                        Logging.full('Google', e);
                    });
    },

    getRandomImage: function (phrase, callback, NSFW) {
        var safeSearch = (NSFW == "sfw") ? 'high' : 'off';
        this.searchImages(phrase, callback, safeSearch);
    }
};