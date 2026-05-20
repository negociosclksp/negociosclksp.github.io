// Service Worker - Network First Strategy
const CACHE_NAME = 'bi-callink-v1';

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.url.includes('index.html') || e.request.url.endsWith('/')){
    e.respondWith(
      fetch(e.request, {cache: 'no-store'})
        .catch(function(){ return caches.match(e.request); })
    );
  }
});
