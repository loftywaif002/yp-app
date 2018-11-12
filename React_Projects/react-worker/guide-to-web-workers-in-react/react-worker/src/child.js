var request = require('request');

export default (url,cb) => {
    var start = new Date();
    request(url, function(err, res, body) {
        var responseTime = new Date() - start;
         cb(err, res, body, responseTime);
    });
};
