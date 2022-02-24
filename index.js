require('./server')({
  bot: false,
  game: false,
  cookie: true,
  primaryProxy: 'rhodium',
  googleBlock: true,
  routes: {
    "main": "normal",
    "rhodiumub.dev": "rhodium",
    "shark.*": "rammerhead"
  }
})