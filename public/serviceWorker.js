var cacheName = "version-3"

var filesToCache = [
  '/index.html',
  '/dist/assets/index.ff80710c.js',
  '/dist/assets/index.07b5d4d5.css',
  '/manifest.json',
  '/tick-box-192x192.png',
  '/tick-box-512x512.png',
  '/icons8-tick-box.svg'
];

//Adding 'install' event listener
self.addEventListener('install', function (event) {
  console.log('Event: Install');

  event.waitUntil(
    //Open the cache
    caches.open(cacheName)
      .then(async function (cache) {
        //Adding the files to cache
        await cache.addAll(filesToCache);
        console.log("All files are cached.");
      })
      .catch(function (err) {
        console.log(err)
      })
  );
});

//Adding 'activate' event listener
self.addEventListener('activate', function (event) {
  console.log('Event: Activate');

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== cacheName) {     //cacheName = 'cache-v1'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );

  // return self.clients.claim(); //To activate this SW immediately without waiting.
});

//Adding 'fetch' event listener
self.addEventListener('fetch', function (event) {
  var request = event.request;

  //Tell the browser to wait for network request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then(function (response) {
      if (response) {
        return response;
      }

      //else add the request to cache and return the response
      return fetch(request).then(function (response) {
        var responseToCache = response.clone(); //Cloning the response stream in order to add it to cache
        caches.open(cacheName).then(
          function (cache) {
            cache.put(request, responseToCache); //Adding to cache
          });
        return response;
      });
    }))
});
