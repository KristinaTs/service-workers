// Generally window.self === window;
// Here self refers to the WorkerGlobalScope

// By using self, you can refer to the global scope in a way that will work not only in a window
// context (self will resolve to window.self)
// but also in a worker context (self will then resolve to WorkerGlobalScope.self).

const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'main.js'
];

// Call install
// self in this case explaned on the top of the file
self.addEventListener('install', event => {
    console.log('Service worker: Installed');

    // cache data in the browser, but originally we would want to cache files in the fetch method
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service worker: Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call activate
self.addEventListener('activate', event => {
    console.log('Service worker: Activate');

    //remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log(`Service worker: Clearing old cache: ${cache}`);
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call fetch event - show cached files if we are offline
self.addEventListener('fetch', event => {
    console.log('Service worker: Fetcing');
    // If we are offline the method will fail and we can fetch the data from the service worker
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});