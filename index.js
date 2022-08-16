// Initiates backend with config

(async() => {
  await import('./server.mjs').then(e=>e.default({
    game: false,
    cookie: false,
    primaryPrxxy: 'ultraviolet',
    googleBlock: true,
    cors: true,
    emulator: true,
    config: {
      port: 2000,
      gamePort: 3000,
    }
  }));
})();
