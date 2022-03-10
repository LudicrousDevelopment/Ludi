(async() => {
  await import('./server.mjs').then(e=>e.default({
    bot: true,
    game: true,
    cookie: false,
    primaryProxy: 'ultraviolet',
    googleBlock: true,
    cors: true,
    rammerhead: true,
  }));
})();