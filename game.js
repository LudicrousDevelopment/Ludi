// Simple Express.Static Server to Serve GFILES.

import express from 'express';
import Serve from 'node-static';
const fakeServe = new Serve.Server('fakeStatic/');
var app = express()
app.use((request, response, next) => {
  const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

  var isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254');  

  if (isLS) return fakeServe.serve(request, response);

  next()
})
app.use('/gfiles', express.static('./Gfiles-Upgraded'))
app.listen(process.env.PORT || 9999, console.log('Ludicrous Games Running at http://localhost:'+(process.env.PORT || 9999)));