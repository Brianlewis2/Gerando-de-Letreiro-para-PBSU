const CACHE_NAME = 'letreiro-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',  // Se tiver CSS separado
  // Adicione aqui outros arquivos que seu site usa (JS, imagens, fontes, etc)
];

// Instala o Service Worker e cacheia os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Intercepta requisições e responde com cache ou fetch online
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
