// sw.js का संशोधित कोड

const CACHE_NAME = 'mock-test-v9'; // वर्जन बदलें (जैसे v8 से v9)

const urlsToCache = [
  '/',
  'index.html',
  'courses.html',
  'test.html',      
  'style.css',
  'script.js',
  'questions.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// इंस्टॉल इवेंट
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// फेच इवेंट (नेटवर्क फॉलबैक के साथ कैश-फर्स्ट रणनीति)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर कैश में है तो रिटर्न करें
        if (response) {
          return response;
        }
        // वर्ना नेटवर्क से फेच करें
        return fetch(event.request);
      })
  );
});


// एक्टिवेट इवेंट: पुराने कैश को हटाने के लिए
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});