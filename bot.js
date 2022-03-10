import fs from 'fs'
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import https from 'https'
var atob = str => new Buffer.from(str, 'base64').toString('utf-8')
const config = {
  "token": atob('T0RBNE1ETTJOVGcwT1RNd01ERTNOREV3LllDQXN0Zy5CYjljbklyWGhTYXdaZUdjM2xRRFRrR29zXzQ='),
  "prefix": "%",
  "footIcon": "https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg",
  "creator": "EnderKingJ"
}
//const {v4: uuidv4} = require('uuid')
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * (this.length))]
};
const proxies = JSON.stringify({
  "LD": [
    "https://chemistryhelp.org",
    "https://conventionalize.org",
    "https://cattlefood.org",
    "https://bhutanfacts.xyz",
    "https://ensuremath.com",
    "https://physicalsalad.com",
    "https://manualcars.net",
    "https://geothermalmaps.com",
    "https://ludicrous.gq",
    "https://ludicrous911.info",
    "https://creativehog.com",
    "https://languagetips.net",
    "https://ludiub.com",
    "https://ludicrous.icu",
    "https://plantheaven.net",
    "https://the-t-fr.com",
    "https://911911911.info",
    "https://regionalmapping.com",
    "https://shirt.gq",
    "https://zester.network"
  ]
})

import Discord from 'discord.js'
var { Permissions } = Discord

var Bot = new Discord.Client()
Bot.login(config.token);

Bot.on('message', message => {
  if (message.content.startsWith(config.prefix)) {
    message.arguments = message.content.split(' ')
    message.arguments[0] = message.arguments[0].split(config.prefix)[1]
    var command = message.arguments.splice(0, 1)
    var marguments = message.arguments
    /*if (command=='proxy') {
      if (arguments.length==0) {
        message.channel.send('choose proxy lmao')
      } else {
        var auth = false
        Object.keys(proxies).map(key => {
          if (key==arguments[0].toUpperCase()) auth = true
        })
        if (!auth) return message.channel.send(`<@${message.author.id}> Please Choose A Real Proxy Type`)
        var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Proxy Dispenser')
          .setURL('https://discord.gg/Xta3z8HV4D')
          .setDescription('Free Ludicrous Proxy Service')
          .addFields(
            { name: 'Link:', value: proxies[arguments[0].toUpperCase()].random() }
          )
          .addField('Type:', arguments[0].toString().toUpperCase(), false)
          .addField('Remaining Requestable Proxies:', '99999999999999999', true)
          .addField('Reminder:', 'Use `%report sitetype reason` to report any issue with the proxy!', false)
          .setFooter('Made by '+config.creator, config.footIcon);

        message.author.send({ embed: embed })
      }
    }*/
    if (command=='report') {

    }
    if (command=='purge') {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Not Allowed')
      if (marguments[1]) message.channel = Bot.channels.cache.get(marguments[1])
      message.channel.messages.fetch({ limit: parseInt(marguments[0])+1 }).then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send('Purged '+marguments[0]+' Messages').then((e) => {
          setTimeout(() => e.delete(), 5000);
        })
        return
      })
    }
    if (command=='domains') {
      return message.channel.send('There are Currently '+JSON.parse(proxies)['LD'].length+' Domains!\n\n'+JSON.parse('['+JSON.parse(proxies)['LD'].map((e) => e.includes('.com') ? "true" : ' ').toString().replace(/, /gi, '').replace(/,/, '')+']').length+' .com\n\n'+JSON.parse('['+JSON.parse(proxies)['LD'].map((e) => e.includes('.org') ? "true" : ' ').toString().replace(/, /gi, '').replace(/^,/, '')+']').length+' .org'+'\n\n'+JSON.parse('['+JSON.parse(proxies)['LD'].map((e) => e.includes('.net') ? "true" : ' ').toString().replace(/, /gi, '').replace(/,/, '')+']').length+' .net')
    }
  }
})

Bot.on('guildMemberAdd', member => {
  member.send("Welcome to Ludicrous!");
});