// Initiates backend with config

(async() => {
  await import('./server.mjs').then(e=>e.default({
    game: false,
    cookie: false,
    primaryPrxxy: 'ultraviolet',
    googleBlock: true,
    cors: true,
    rammerhead: true,
    rammerheadURL: 'r.911911911.info',
    emulator: true,
    config: {
      port: 8080,
      gamePort: 3000,
    }
  }));
})();