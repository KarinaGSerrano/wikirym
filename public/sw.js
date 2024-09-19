// ----------------------------------------------------------------------- //

const CACHE_NAME = "cache-rym";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.png",
  "/img/",
  "/img/bg-footer.svg",
  "/img/estrellas_bg.svg",
  "/img/ico-0.png",
  "/img/ico-1.png",
  "/img/ico-2.png",
  "/img/ico-3.png",
  "/img/icon.png",
  "/img/portadarym.png",
  "/img/Wiki-RyM.png",
];

const urlsJs = ["/js/app.js", "/js/chunk-vendors.js"];

const scope = self.registration.scope;

// ----------------------------------------------------------------------- //

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("abrió la cache: ", CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        // Activar el service worker inmediatamente
        return self.skipWaiting();
      })
  );
});

// ----------------------------------------------------------------------- //

self.addEventListener("activate", function (event) {
  // Limpiar el cacheado
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (cacheName) {
              // Quitar caches que no sean de la misma versión
              return cacheName !== CACHE_NAME;
            })
            .map(function (cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

// ----------------------------------------------------------------------- //

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  const urlAptaCache = urlListaBlancaCache(url);

  const cacheResponse = caches.match(event.request).then((response) => {
    if (response) {
      console.log("Va a buscar en la CACHE", url);
      return response;
    } else {
      if (urlAptaCache) {
        console.log("Va a buscar en el SERVER y CACHEA", url);
        return fetch(event.request).then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      } else {
        console.log("Va a buscar siempre al SERVER", url);
        return fetch(event.request);
      }
    }
  });
  event.respondWith(cacheResponse);
});

// ----------------------------------------------------------------------- //

function urlListaBlancaCache(urlEvent) {
  let url = urlEvent;
  if (
    // url.includes("app.js") ||
    // url.includes("chunk-vendors.js") ||
    url.includes(".png") ||
    url.includes(".svg") ||
    url.includes(".jpeg")
  )
    return true;
}
