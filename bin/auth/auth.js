const request = require('request-promise-native');
const keys = require('./keys.json');
const siteUrl = require('../../settings.json').apiUrl;
const authKey = keys.AUTH_KEY;
const authSecret = keys.AUTH_SECRET;

// this is ad hoc and run manually
// this is for getting the 'permanent' (authorized) - keys

let qs = require('querystring'),
    oauth = {
        callback: 'http://dummydevurl.io/callback',
        consumer_key: authKey,
        consumer_secret: authSecret,
        token: '', // token retrieved using preauth.js (value not stored in keys, not used again)
        token_secret: '', // secret retrieved using preauth.js (value not stored in keys, not used again)
        verifier: '' // <-- verifier here retrieved from user authentication in browser
    },
    url = siteUrl + '/oauth/token';

let oauth_authorized_token = request.post({
    url: url,
    oauth : oauth
});

oauth_authorized_token.then(authorized_token_response => {
    // these will be the permanent keys
    console.log(authorized_token_response);
    console.log('These "permanent" keys are used in conjuction with the "verifier" token id\n' +
                'to authenticate requests to the REST API. Store them in the keys.json file.')
}).catch(err => {
    console.log('Error resolving oauth_token_response POST (Promise): ' + err);
});
