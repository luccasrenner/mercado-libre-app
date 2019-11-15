const https = require('https')
function GETRequest(_url = '') {
    return new Promise( (resolve, reject) => {
        https.get(_url, res => {
            res.setEncoding("utf8");
            // Build response body in a string
            var resBody = '';
            // Listen for data and add
            res.on('data', function (chunk) {
                resBody += chunk
            });
            //Resolve data
            res.on("end", () => {
                resolve(resBody);
            });
        });
    } )
}
module.exports = GETRequest;