import Server from './bare-server-node/Server.mjs';
import { readFileSync } from 'fs';
import http from 'http';
import Serve from './serve.mjs'
import UkBro from './uk-bro.js'

async function config(config) {
  const bare =  new Server('/bare/', '');
  var server = http.createServer();  
  
  var Rhodium = await import('Rhodium');
  Rhodium = new Rhodium.default({server: server, prefix: '/client/',encode: 'plain', wss: true, uv: [true, {}]})

  console.log(config)

  const handler = {
    '404': function(req, res) {
      console.log(req.url)
    },
    '403': function(req, res) {
      
    },
    'index': function(req, res, data, type) {
      function Configuration(str) {
        return str.replace('data-options=""', 'data-options='+JSON.stringify(config)+'')
      }
      res.writeHead(200, {'content-type':type}).end(Configuration(data.toString()))
    },
    indexfile: true
  }
  
  const serve = Serve('./public', handler)
  
  server.on('request', (request, response) => {
      if (bare.route_request(request, response)) return true;
      (request, response)
      if (request.url.startsWith('/client/')) {return Rhodium.request(request, response)}
      if (request.url.startsWith('/cdn')) return response.writeHead(301, {location: 'https://cdn.'+request.headers['host']}).end('')
      serve(request, response)
  });

  Rhodium.init()
  
  server.listen(process.env.PORT || 8080);
}
export default config