// sw.js का सही कोड

const CACHE_NAME = 'mock-test-v4'; // वर्जन को v2 से v3 कर दिया गया है

// कैश करने के लिए आवश्यक फाइलें
const urlsToCache = [
  '/',
  'index.html',
  'courses.html',
  'test.html',      // <-- यह महत्वपूर्ण लाइन जोड़ी गई है
  'style.css',
  'script.js',
  'questions.json',
  '/icons/icon-192.png', // आइकन को भी कैश कर लेते हैं
  '/icons/icon-512.png', // आइकन को भी कैश कर लेते हैं
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// इंस्टॉल इवेंट: जब सर्विस वर्कर इंस्टॉल होता है
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// फेच इवेंट: जब भी कोई रिसोर्स (जैसे पेज, इमेज) फेच होता है
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर कैश में मिलता है, तो वहां से रिटर्न करो, वरना नेटवर्क से फेच करो
        return response || fetch(event.request);
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
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
