import {parse, serialize} from 'parse5';
import walk from 'walk-parse5';
import follow from 'follow-redirects';
const { https } = follow;

function getFavicons(host) {
  return new Promise((resolve, reject) => {
    var data = []
    
    https.request('https://'+host.replace('https://','').replace('https:/',''), function(response) {
      response.on('data',e=>data.push(e)).on('end', function() {
        var text = (Buffer.concat(data).toString())

        var parsed = parse(text)

        var toreturn = []

        walk(parsed, function(node) {
          if (node.tagName=='link'&&(node.attrs.find(e=>e.name=='rel')||{}).value=='icon') toreturn.push({src: 'https://'+host.replace('https://','').replace('https:/','')+(node.attrs.find(e=>e.name=='href')||{}).value.replace(host,'').replace('https://','')})
          //console.log(node.tagName=='meta'&&(node.attrs.find(e=>e.name=='itemprop')||{}).value=='image'))
          if (node.tagName=='meta'&&(node.attrs.find(e=>e.name=='itemprop')||{}).value=='image') toreturn.push({src: 'https://'+host.replace('https://','').replace('https:/','')+(node.attrs.find(e=>e.name=='content')||{}).value.replace(host,'').replace('https://','')})
        })

        return resolve({
          icons: [
            ...toreturn
          ]
        })
      })
    }).on('error',()=>{}).end()
  })
}

export default function(host, req, res) {
  getFavicons(host).then(data=>{
    res.end((data.icons[0]||{src:req.headers['x-forwarded-proto']+'://'+req.headers['host']+'/ico/dark.ico'}).src)
  })
}