import mime from 'mime'
import { readFileSync } from 'fs'

var defaults = {
  indexfile: true,
  '404': null,
  '403': null,
  'index': null
}

export function Serve(path, config) {
  var config = Object.assign(defaults, config)
  console.log(config)
  return function(req, res) {
    var type = mime.getType(req.url.split('?')[0].split('#')[0])||'text/html'
    if (req) {
      var url = path+req.url.split('?')[0].split('#')[0]
      if (req.url.split('?')[0].split('#')[0]=='/'&&config.indexfile==true) {url+='index.html'}
      try {readFileSync(url)} catch {/*if (config['404']) return config['404'](req, res)*/;return res.end('Not Found')}
      if (req.url.split('?')[0].split('#')[0]=='/'&&config.indexfile==true) {if (config.index) return config.index(req, res, readFileSync(url), type)}
      return res.writeHead(200, {'content-type':type}).end(readFileSync(url))
    } else {
      throw new Error('Request Object: Expected [object Request], got undefined')
    }
  }
}

export default Serve