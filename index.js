// Initiates backend with config

(async() => {
  await import('./server.mjs').then(e=>e.default({
    game: false,
    cookie: false,
    primaryPrxxy: 'ultraviolet',
    googleBlock: true,
    cors: true,
    uk: false,
    an: false,
    rammerhead:	false, 
    rammerheadURL: 'r.911911911.info',
    emulator: true,
    config: {
      port: 2000,
      gamePort: 3000,
    },
    links: [
      "https://fractiontools.com",
      "https://pioneersites.org",
      "https://dailylights.org", 
      "https://calculatehelp.org",
      "https://erraticphysics.com",
      "https://packcheap.net",
    ]
  }));
})();
