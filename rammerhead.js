import http from 'http';
import https from 'https'
var server = http.Server();

server.on("request", (req, res) => {
  var url = new URL('https://r.911911911.info/newsession')
  url.remoteAddress = req.headers['x-forwarded-for']
  https.request(url, {method: 'GET', headers: {}}, (response) => {
    var chunks = []
    response.on('data', chunk => chunks.push(chunk)).on('end', () => {
      res.end(Buffer.concat(chunks).toString())
    })
  }).end()
});

server.listen(process.env.PORT || 8443, console.log('Ludicrous Rammerhead Running at http://localhost:'+(process.env.PORT || 8443)));