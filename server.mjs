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
      if (config.cookie) {
        if (req.headers['cookie']) {
          req.cookie = {}
          var a = (req.headers['cookie'].split('; ').map(e => {
            var name = e.split('=')[0],value=e.split('=')[1]
            req.cookie[name] = value
            return `${name}=${value}`
          }).join('; '))
          //console.log(a)
          if (!req.cookie['ld-auth-setter']) if (req.url.startsWith(prefix)||req.url.startsWith(Corrosion.prefix)) return res.writeHead(403).end(fs.readFileSync('./public/401.html'))
        }// else if (req.url.startsWith(prefix)||req.url.startsWith(Corrosion.prefix)) return res.writeHead(403).end(fs.readFileSync('./public/401.html'))
        if(req.headers.useragent === 'googlebot') return res.writeHead(403).end('');
      }
      if (req.headers['host'].startsWith('cdn.')) {
        var response;
        var url = 'http://'+req.headers['host']+':8080'+req.url
        if (req.url.startsWith('/method/swf')) return res.writeHead(301, {location: 'https://'+req.headers['host'].replace('cdn.','')+'/client/gateway?url=https://cohenerickson.github.io/radon-games-assets'+req.url.replace('/method','')}).end('')//url = 'https://cohenerickson.github.io/radon-games-assets'+req.url
        fetch(url).then(r => {response=r;return r.text()}).then(text=>{var headers = response.headers;Object.entries(headers).forEach(([e,v])=>headers[e]=v.join(''));res.writeHead(response.status,headers).end(text)})
        return ''
      }
      serve(request, response)
  });

  Rhodium.init()
  
  server.listen(process.env.PORT || 8080);
}
export default config