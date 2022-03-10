import mime from 'mime'
import { readFileSync } from 'fs'

var defaults = {
  indexfile: true,
  '404': null,
  '403': null,
  'index': null
}

export function Serve(path, config, cors) {
  var config = Object.assign(defaults, config)
  return function(req, res, cors) {
    var type = mime.getType(req.url.split('?')[0].split('#')[0])||'text/html'
    if (req) {
      var url = path+req.url.split('?')[0].split('#')[0]
      if (req.url.split('?')[0].split('#')[0]=='/'&&config.indexfile==true) {url+='index.html'}
      try {readFileSync(url)} catch {/*if (config['404']) return config['404'](req, res)*/;return res.end('Not Found')}
      if (req.url.split('?')[0].split('#')[0]=='/'&&config.indexfile==true) {if (config.index) return config.index(req, res, readFileSync(url), type)}
      return res.writeHead(200, {'content-type':type, 'access-control-allow-origin':cors?'*':request.headers['host']}).end(readFileSync(url))
    } else {
      throw new Error('Request Object: Expected [object Request], got undefined')
    }
  }
}

export default Serve