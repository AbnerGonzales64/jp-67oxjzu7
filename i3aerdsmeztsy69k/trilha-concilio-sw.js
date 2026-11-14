/* Só os arquivos desta trilha entram no cache. O resto, inclusive rotinas do mesmo diretório, segue para a rede. */
var CACHE = 'trilha-concilio-v1';
var FILES = [
  'trilha-concilio-2026-11-07.html',
  'trilha-concilio.webmanifest',
  'trilha-concilio-icons/favicon.svg',
  'trilha-concilio-icons/favicon-32.png',
  'trilha-concilio-icons/favicon-16.png',
  'trilha-concilio-icons/icon-192.png',
  'trilha-concilio-icons/icon-512.png',
  'trilha-concilio-icons/icon-maskable-192.png',
  'trilha-concilio-icons/icon-maskable-512.png',
  'trilha-concilio-icons/apple-touch-180.png'
];
var ALLOW = {};
FILES.forEach(function(path){
  var abs = new URL(path, self.location);
  ALLOW[abs.pathname] = abs.href;
});

self.addEventListener('install', function(event){
  event.waitUntil(caches.open(CACHE).then(function(cache){
    return cache.addAll(FILES.map(function(path){ return new URL(path, self.location).href; }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(event){
  event.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(key){
      if(key.indexOf('trilha-concilio-') === 0 && key !== CACHE) return caches.delete(key);
    }));
  }).then(function(){
    if(self.registration.scope.endsWith('/')) return;
    return self.clients.claim();
  }));
});

self.addEventListener('fetch', function(event){
  var req = event.request;
  if(!req || req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch(e) { return; }
  if(url.origin !== self.location.origin) return;
  var href = ALLOW[url.pathname];
  if(!href) return;
  event.respondWith(caches.open(CACHE).then(function(cache){
    return fetch(req).then(function(res){
      if(res && res.ok && res.type === 'basic') cache.put(href, res.clone());
      return res;
    }).catch(function(){
      return cache.match(href);
    });
  }));
});
