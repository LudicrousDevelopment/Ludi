import Server from './bare-server-node/Server.js';
import { readFileSync } from 'fs';
import http from 'http';
import Serve from './serve.mjs'
import fetch from 'node-fetch'

//var configuration = JSON.parse(readFileSync('./config.json'))

const bare =  new Server('/bare/', '');
var server = http.createServer();  

async function config(config) {

  const configuration = config.config

  var Rhodium = await import('Rhodium');
  Rhodium = new Rhodium.default({server: server, prefix: '/client/',encode: 'plain', wss: true, uv: [true, {}]})

  if (config.game==true) {await import('./game.js')}
  if (config.bot==true) {await import('./bot.js')}
  if (config.rammerhead==true) {await import('./rammerhead.js')}
  
  const handler = {
    '404': function(req, res) {
      console.log(req.url)
    },
    '403': function(req, res) {
      
    },
    'index': function(req, res, data, type) {
      function Configuration(str) {
        return str.replace('data-options=""', 'data-options='+JSON.stringify(config)+'').replace('${location.origin}', 'https://'+req.headers['host'])
      }
      res.writeHead(200, {'content-type':type}).end(Configuration(data.toString()))
    },
    indexfile: true
  }
  
  const serve = Serve('./public', handler)
  
  server.on('request', (request, response) => {

    if (request.url.startsWith('/sw/')) return response.writeHead(200, {'content-type': 'text/html'}).end('<script>location.reload()</script>');
    if (request.url.split('?')[0].split('#')[0]=='/webretro'||request.url.split('?')[0].split('#')[0]=='/webretro/') return response.end(readFileSync('./public/webretro/index.html'))
    
      if (bare.route_request(request, response)) return true;
      if (request.url.startsWith('/client/')) {response.writeHead = new Proxy(response.writeHead, {apply(t, g, a) {if (a[1] && config.cors) a[1]['access-control-allow-origin'] = '*';return Reflect.apply(t, g, a)}});return Rhodium.request(request, response)}
      if (request.url.startsWith('/cdn')) return response.writeHead(301, {location: 'http://cdn.'+request.headers['host']}).end('')
      if (config.cookie) {
        if (request.headers['cookie']) {
          request.cookie = {}
          var a = (request.headers['cookie'].split('; ').map(e => {
            var name = e.split('=')[0],value=e.split('=')[1]
            request.cookie[name] = value
            return `${name}=${value}`
          }).join('; '))
          if (!request.cookie['ld-auth-setter']) if (request.url.startsWith('/client/')||request.url.startsWith('/service/')) return response.writeHead(403).end(fs.readFileSync('./public/401.html'))
        }
        if(request.headers.useragent === 'googlebot') return response.writeHead(403).end('');
      }
      if (request.headers['host'].startsWith('cdn.')) {
        var res;
        var url = 'http://'+request.headers['host']+':8080'+request.url
        if (request.url.startsWith('/method/swf')) return response.writeHead(301, {location: 'https://'+request.headers['host'].replace('cdn.','')+'/client/gateway?url=https://cohenerickson.github.io/radon-games-assets'+request.url.replace('/method','')}).end('')
        fetch(url).then(r => {res=r;return r.text()}).then(text=>{var headers = res.headers;Object.entries(headers).forEach(([e,v])=>headers[e]=v.join(''));response.writeHead(res.status,headers).end(text)})
        return ''
      }
    if (request.url.startsWith('/key')) return fetch('http://cdn.'+request.headers['host']+':8443/').then(e=>e.text()).then(e=>response.end(e));//fetch('https://cdn.'+request.headers['host']+':8443/').then(e=>e.text()).then(e=>response.end(e))

    if (request.url.endsWith('/webretro/info/')) request.url = '/webretro/info/index.html'

      serve(request, response, config.cors)
  });

  Rhodium.init()

  const port = process.env.PORT || (configuration.port || 8080)
  
  server.listen(port, console.log('http://localhost:'+port));
}
export default config
