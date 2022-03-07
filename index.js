(async() => {
  await import('./server.mjs').then(e=>e.default({
    bot: true,
    game: true,
    cookie: true,
    primaryProxy: 'ultraviolet',
    googleBlock: true,
  }));
})();