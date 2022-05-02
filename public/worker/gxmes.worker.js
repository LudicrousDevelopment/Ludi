self.addEventListener('install', event => {
    self.skipWaiting();
    console.log(`Event Installed`);
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    var request = event.request
    var url = request.url.split('#')[0].split('?')[0]
    event.respondWith((async () => {
        if (url == location.origin + '/backend/gfiles/') {
            var fetched = await fetch('/back/gxmes.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/em/') {
            var fetched = await fetch('/back/emulators.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/faq/') {
            var fetched = await fetch('/back/faq.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/') {
            var fetched = await fetch('/back/back.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/pp/') {
            var fetched = await fetch('/back/pp.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/tos/') {
            var fetched = await fetch('/back/tos.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/credit/') {
            var fetched = await fetch('/back/credit.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else if (url == location.origin + '/backend/analytics/') {
            var fetched = await fetch('/back/analytics.html');
            var text = await fetched.text();

            return new Response(text, {
                headers: {
                    'content-type': fetched.headers['content-type']
                }
            });
        } else return fetch(request) //new Response(await (await fetch(request)).text(), {headers: {'content-type': (await (await fetch(request)).headers.get('content-type'))}})
    })())
})