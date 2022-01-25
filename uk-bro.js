const Discord = require('discord.js');
var bot = new Discord.Client();

var btoa = (str) => (Buffer.from(str).toString('base64')),
  atob = (str) => (Buffer.from(str, 'base64').toString());

bot.login(atob("T0RrMU5qY3lOVE15TXpFeE5qSTVPVEExLllWNy1EQS5WRGR1YjdPSTZ3dFFRWGRudFh1dFNGVjdwejA="))
/*bot.on('message', message => {
  console.log(message.content)
})*/
setInterval(() => {
  var date = new Date()
  var hours = date.getUTCHours();
  var params1 = hours === 15 && date.getMinutes() === 0
  var params2 = hours === 1 && date.getMinutes() === 0
  var params3 = false
  var command = '/poll "how are you" "1" "2" "3" "4" "5" "6" "7" "8" "9" "10"'
  var ping = '<@&832255692730925066>'
  if (params1 || params2 || params3) {
    bot.channels.cache.get("831704189973037106").send(command)
    setTimeout(() => bot.channels.cache.get("831704189973037106").send(ping), 1000)
  }
}, 60000)
function app(req, res) {
  res.end('JOE MAMA')
}
//require('http').createServer(app).listen(1024)