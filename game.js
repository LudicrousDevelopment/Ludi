import express from "express";
import fs from 'fs'
var config = JSON.parse(fs.readFileSync('./config.json'))
import express$0 from "express";
import express$1 from "express";
import express$2 from "express";
import routes from "./server/routes.js";
const app = express();
// setup options
app.get('/', (e,r)=>r.send('<script>location.href="/games"</script>'))
app.use('/assets/', (req, res) => {
  return res.send('no')
})
app.use('/webretro/', express$0.static('public/webretro', {}))
app.use(express$0.static('public', {}));
app.use(express$0.static('views', {}));
app.set('view engine', 'ejs');
// The try block is here to allow node versons below 16x
app.use(express$1.json());
app.use(express$2.urlencoded({ extended: true }));
// register routes
routes(app);
// listen for requests
const port = process.env.PORT || config.gamesPort || 3000
app.listen((port), console.log('Ludicrous Games Running at http://localhost:'+port));
