// Rammerhead KEY Generator, Also Runs Rammerhead.

import http from 'http';
import https from 'https'
import Serve from 'node-static';
const fakeServe = new Serve.Server('fakeStatic/');
var server = http.Server();

//import * as Rammerhead from '/rammerhead/src/server.js'

export default function rammerhead(config) {
  server.on("request", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    var isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254');  
  
    if (isLS) return fakeServe.serve(req, res);
    var url = new URL('https://'+config.rammerheadURL+'/newsession')
    https.request(url, {method: 'GET', headers: {}}, (response) => {
      var chunks = []
      response.on('data', chunk => chunks.push(chunk)).on('end', () => {
        try {
        res.end(Buffer.concat(chunks).toString())
        } catch(e) {return res.end(e.toString())}
      })
    }).end()
  });
  
  server.listen(process.env.PORT || 8443, console.log('Ludicrous Rammerhead Running at http://localhost:'+(process.env.PORT || 8443)));
}