(async() => {
  await import('./server.mjs').then(e=>e.default({
    bot: false,
    game: false,
    cookie: true,
    primaryProxy: 'ultraviolet',
    googleBlock: true,
  }));
})();