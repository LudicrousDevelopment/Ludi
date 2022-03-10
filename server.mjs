import Server from './bare-server-node/Server.js';
import { readFileSync } from 'fs';
import http from 'http';
import Serve from './serve.mjs'
import UkBro from './uk-bro.js'
import fetch from 'node-fetch'

var configuration = JSON.parse(readFileSync('./config.json'))

const bare =  new Server('/bare/', '');
var server = http.createServer();  

async function config(config) {

  var Rhodium = await import('Rhodium');
  Rhodium = new Rhodium.default({server: server, prefix: '/client/',encode: 'plain', wss: true, uv: [true, {}]})

  if (config.game==true) {await import('./game.js')}
  if (config.bot==true) {await import('./bot.js')}
  
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
      if (request.url.startsWith('/client/')) {response.writeHead = new Proxy(response.writeHead, {apply(t, g, a) {console.log(a[1]['set-cookie']);if (a[1] && config.cors) a[1]['access-control-allow-origin'] = '*';return Reflect.apply(t, g, a)}});return Rhodium.request(request, response)}
      if (request.url.startsWith('/cdn')) return response.writeHead(301, {location: 'https://cdn.'+request.headers['host']}).end('')
      if (config.cookie) {
        if (request.headers['cookie']) {
          request.cookie = {}
          var a = (request.headers['cookie'].split('; ').map(e => {
            var name = e.split('=')[0],value=e.split('=')[1]
            request.cookie[name] = value
            return `${name}=${value}`
          }).join('; '))
          //console.log(a)
          if (!request.cookie['ld-auth-setter']) if (request.url.startsWith('/client/')||request.url.startsWith('/service/')) return response.writeHead(403).end(fs.readFileSync('./public/401.html'))
        }// else if (req.url.startsWith(prefix)||req.url.startsWith(Corrosion.prefix)) return res.writeHead(403).end(fs.readFileSync('./public/401.html'))
        if(request.headers.useragent === 'googlebot') return res.writeHead(403).end('');
      }
      if (request.headers['host'].startsWith('cdn.')) {
        var response;
        var url = 'http://'+request.headers['host']+':8080'+req.url
        if (request.url.startsWith('/method/swf')) return response.writeHead(301, {location: 'https://'+request.headers['host'].replace('cdn.','')+'/client/gateway?url=https://cohenerickson.github.io/radon-games-assets'+request.url.replace('/method','')}).end('')//url = 'https://cohenerickson.github.io/radon-games-assets'+req.url
        fetch(url).then(r => {response=r;return r.text()}).then(text=>{var headers = response.headers;Object.entries(headers).forEach(([e,v])=>headers[e]=v.join(''));res.writeHead(response.status,headers).end(text)})
        return ''
      }
    if (request.url.startsWith('/key')) return fetch('http://cdn.ludicrous911.info:8443/').then(e=>e.text()).then(e=>response.end(e));//fetch('https://cdn.'+request.headers['host']+':8443/').then(e=>e.text()).then(e=>response.end(e))

      serve(request, response, config.cors)
  });

  Rhodium.init()
  
  server.listen(process.env.PORT || (configuration.port || 8080));
}
export default config