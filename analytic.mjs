// Analytics backend script, no longer needed.

/*
import url from 'url';
import qs from 'querystring';
import * as fs from 'fs';

try {
  fs.readFileSync('./stats.json');
} catch(e) {
  console.log('Installing Analytics API');
  fs.writeFileSync('./stats.json', JSON.stringify({"users":0,"top":0,"visits":0,"id":[]}));
}

export default function(req, res) {
  if (!req.url.startsWith('/analytics.')) return true;

  var stats = JSON.parse(fs.readFileSync('./stats.json'));

  req.query = qs.parse(url.parse(req.url).query)
  var id = req.query.id
  
  if (req.url.startsWith('/analytics.start')) {
    if (stats.id.find(e => e.id==id)) return res.end('Exists')
    var key = stats.id.push({pinged: new Date().getTime(), id: id})-1;

    stats.visits++

    stats.users = stats.id.length

    if (stats.top<stats.users) stats.top = stats.users;
    
    res.end('Done')

    var int = setInterval(function() {
      if (!stats.id[key]) return clearInterval(int);
      if((new Date().getTime() - stats.id[key].pinged)>29999) {
        stats.id.splice(key, 1);
        stats.users = stats.id.length
      }
      fs.writeFileSync('./stats.json', JSON.stringify(stats))
    }, 30000)
  }

  if (req.url.startsWith('/analytics.ping')) {
    if (!stats.id.find(e => e.id==id)) return res.end('Failed')
    if (!id) return res.end('Failed')

    if (stats.top<stats.users) stats.top = stats.users;
    var user = stats.id.find(e => e.id==id)
    var origin = user;
    user.pinged = new Date().getTime()
    stats.id[stats.id.indexOf(origin)] = user

    res.end('Success')
  }

  if (req.url.startsWith('/analytics.users')) {
    if (stats.top<stats.users) stats.top = stats.users;
    return res.end(JSON.stringify(stats))
  }

  if (req.url.startsWith('/analytics.client.js')) {
    return res.end(fs.readFileSync('./client.js'))
  }

  if (req.url.startsWith('/analytics.worker.js')) {
    return res.end(fs.readFileSync('./worker.js'))
  }

  return fs.writeFileSync('./stats.json', JSON.stringify(stats))
}*/

import { Analytics } from 'analytics';
import Plugin from './plugin.mjs';
import http from 'http';
import * as fs from 'fs';

/* Initialize analytics */
const analytics = Analytics({
  app: 'my-app-name',
  version: 100,
  plugins: [
    Plugin({
      init: JSON.parse(fs.readFileSync('./stats.json')).id
    })
  ]
})

function Main(req, res) {
  console.log(req.url)
  if (!req.url.startsWith('/data/')) return false;
  if (req.url.startsWith('/data/update/')) {
    analytics.plugins.ludicrous.update({
      url: req.url,
      time: new Date(),
      res: res,
    })
  } else if (req.url.startsWith('/data/delete/')) {
    analytics.plugins.ludicrous.delete({
      url: req.url,
      res: res,
      req: req,
    })
  } else if (req.url.startsWith('/data/data')) {
    res.end(fs.readFileSync('./stats.json'));
  } else {
    analytics.page({
      url: req.url,
      time: new Date()
    })
    res.end('success')
  }
}

http.createServer(Main).listen(9090)

//import url from"url";import qs from"querystring";import*as fs from"fs";try{fs.readFileSync("./stats.json")}catch(s){console.log("Installing Analytics API"),fs.writeFileSync("./stats.json",JSON.stringify({users:0,top:0,visits:0,id:[]}))}export default function(s,i){if(!s.url.startsWith("/analytics."))return!0;var t=JSON.parse(fs.readFileSync("./stats.json"));s.query=qs.parse(url.parse(s.url).query);var e=s.query.id;if(s.url.startsWith("/analytics.start")){if(t.id.find(s=>s.id==e))return i.end("Exists");var r=t.id.push({pinged:(new Date).getTime(),id:e})-1;t.visits++,t.users=t.id.length,t.top<t.users&&(t.top=t.users),i.end("Done");var n=setInterval(function(){if(!t.id[r])return clearInterval(n);(new Date).getTime()-t.id[r].pinged>29999&&(t.id.splice(r,1),t.users=t.id.length),fs.writeFileSync("./stats.json",JSON.stringify(t))},3e4)}if(s.url.startsWith("/analytics.ping")){if(!t.id.find(s=>s.id==e))return i.end("Failed");if(!e)return i.end("Failed");t.top<t.users&&(t.top=t.users);var a=t.id.find(s=>s.id==e),d=a;a.pinged=(new Date).getTime(),t.id[t.id.indexOf(d)]=a,i.end("Success")}return s.url.startsWith("/analytics.users")?(t.top<t.users&&(t.top=t.users),i.end(JSON.stringify(t))):fs.writeFileSync("./stats.json",JSON.stringify(t))}
