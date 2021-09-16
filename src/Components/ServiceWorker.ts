export default function InitializingServiceWorker() {
  /* Only register a service worker if it's supported */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      console.log("On load")
      navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
        console.log('Worker registration successful', registration.scope);
        registration.onupdatefound = () => {
          var installingWorker = registration.installing!!;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  console.log('New or updated content is available.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  console.log('Content is now available offline!');
                }
                break;
  
              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }
          };
        };
      }, function (err) {
        console.log('Worker registration failed', err);
      }).catch(function (err) {
        console.log(err);
      });
    });
  } else {
    console.log('Service Worker is not supported by browser.');
  }

  /**
   * Warn the page must be served over HTTPS
   * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
   * Installability requires a service worker with a fetch event handler, and
   * if the page isn't served over HTTPS, the service worker won't load.
   */
  // if (window.location.protocol === 'http:') {
  //   const requireHTTPS = document.getElementById('requireHTTPS')!!;
  //   const link = requireHTTPS.querySelector('a')!!;
  //   link.href = window.location.href.replace('http://', 'https://');
  //   requireHTTPS.classList.remove('hidden');
  // }
}
