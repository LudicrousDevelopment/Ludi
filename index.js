(async() => {
  await import('./server.mjs').then(e=>e.default({
    bot: true,
    game: false,
    cookie: false,
    primaryProxy: 'ultraviolet',
    googleBlock: true,
    cors: true,
    rammerhead: true,
    emulator: true,
    config: {
      port: 8080,
      gamePort: 3000,
    }
  }));
})();