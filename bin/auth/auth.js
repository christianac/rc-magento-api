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
        token: 'a66ae34ccf512f78e9e637467e435e9e', // token retrieved using preauth.js (value not stored in keys, not used again)
        token_secret: '6e4a19a2dd7ae71d307cccdee3b46577', // secret retrieved using preauth.js (value not stored in keys, not used again)
        verifier: '464cba966c1c4ef0978f12f4ba0a31c8' // <-- verifier here retrieved from user authentication in browser
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
