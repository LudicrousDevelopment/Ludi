import { parse } from 'querystring';
import { readFileSync, writeFileSync } from 'fs';

export default function providerPluginExample(userConfig) {
  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: 'ludicrous',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {
      whatEver: userConfig.whatEver,
      elseYouNeed: userConfig.elseYouNeed
    },
    initialize: ({ config }) => {
      var users = userConfig.init;

      users.forEach(parsed => {
        setInterval(function() {
          var stats = JSON.parse(readFileSync('./stats.json'))
          
          var foundIndex = stats.id.findIndex(e=>e.id==parsed.id)
          var found = stats.id.find(e=>e.id==parsed.id)
  
          if (!found) {
            stats.users=stats.id.length
            if (stats.top<stats.id.length) stats.top = stats.id.length
            return false;
          }
  
          var time = -1*(((found||{}).date||0)-new Date().getTime())
          
          if (time>30050) stats.id.splice(foundIndex, 1)
  
          stats.users=stats.id.length
          if (stats.top<stats.id.length) stats.top = stats.id.length
  
          return writeFileSync('./stats.json', JSON.stringify(stats))
        }, 30000)
      })
    },
    page: ({ payload }) => {
      const { properties } = payload

      var parsed = parse(properties.url.replace('/data/?',''))
      var url = new Buffer.from(parsed.url, 'base64').toString('utf-8')
      var date = properties.time.getTime()

      var stats = JSON.parse(readFileSync('./stats.json'))

      var found = stats.id.find(e=>parsed.id==e.id)||{id:parsed.id}
      if (found.url) {
        found.url = url
      } else {
        found.date = date
        found.url = url
      }

      stats.id.push(found);
      stats.users=stats.id.length
      if (stats.top<stats.id.length) stats.top = stats.id.length
      stats.visits++

      writeFileSync('./stats.json', JSON.stringify(stats))

      setInterval(function() {
        var stats = JSON.parse(readFileSync('./stats.json'))
        
        var foundIndex = stats.id.findIndex(e=>e.id==parsed.id)
        var found = stats.id.find(e=>e.id==parsed.id)

        if (!found) {
          stats.users=stats.id.length
          if (stats.top<stats.id.length) stats.top = stats.id.length
          return false;
        }

        var time = -1*(((found||{}).date||0)-new Date().getTime())
        
        if (time>30050) stats.id.splice(foundIndex, 1)

        stats.users=stats.id.length
        if (stats.top<stats.id.length) stats.top = stats.id.length

        return writeFileSync('./stats.json', JSON.stringify(stats))
      }, 30000)
    },
    methods: {
      update: ({ url, time, res }) => {
        var parsed = parse(url.replace('/data/update/?',''))
        var date = time.getTime()
  
        var stats = JSON.parse(readFileSync('./stats.json'))

        if (stats.id[stats.id.findIndex(e=>e.id==parsed.id)]) stats.id[stats.id.findIndex(e=>e.id==parsed.id)].date = date

        writeFileSync('./stats.json', JSON.stringify(stats))
        
        if (stats.id.find(e=>e.id==parsed.id)) return res.end('success')
        return res.end('delete')
      },
      delete: ({url, res, req}) => {
        var parsed = parse(url.replace('/data/delete/?',''))
        var id = parsed.id
  
        var stats = JSON.parse(readFileSync('./stats.json'))

        var found = stats.id.find(e => e.id==id)
        var foundIndex = stats.id.findIndex(e => e.id==id)
        if (found) stats.id.splice(foundIndex, 1);

        writeFileSync('./stats.json', JSON.stringify(stats))
      },
      bare: (url) => {
        var bare = JSON.parse(readFileSync('./bare.json'))
        bare.push(url)
        writeFileSync('./bare.json', JSON.stringify(bare))
      },
    },
    loaded: () => {
      // return boolean so analytics knows when it can send data to third party
      return true
    }
  }
}