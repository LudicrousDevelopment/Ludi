import fs from 'fs';

var games = JSON.parse(fs.readFileSync('./games.json'))

var html = '<div class="gxme" id="mc"><img class="gimg" src="/favicon.ico"><gtitle>Minecraft</gtitle></div>';

games.map(e => {
  html+='<div class="gxme"><img class="gimg" src="/favicon.ico"><gtitle>'+e.name+'</gtitle></div>'
})

fs.writeFileSync('./html.html', (html))