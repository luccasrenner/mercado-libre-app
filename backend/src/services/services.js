const https = require('https')
function GETRequest(_url = '') {
    return new Promise( (resolve, reject) => {
        https.get(_url, res => {
            res.setEncoding("utf8");
            res.on("data", data => {
                resolve(data);
            });
        });
    } )
}
module.exports = GETRequest;