import fs from 'fs';

var array = []

var dir = fs.readdirSync('./games/gfiles/gfiles/html5/');
dir.map(e => {
  array.push({
    bare: e,
    name: e,
  })
})

fs.writeFileSync('./games.json', JSON.stringify(array))