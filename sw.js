const CACHE_NAME = 'raj-quiz-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/quiz.html',
  '/homepage.style.css',
  '/style.css',
  '/subjects.json',
  '/rajasthan_history.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// सर्विस वर्कर इंस्टॉल होने पर फ़ाइलों को कैश करें
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache खोला गया');
        return cache.addAll(urlsToCache);
      })
  );
});

// नेटवर्क रिक्वेस्ट को हैंडल करें
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर रिक्वेस्ट कैश में है, तो उसे लौटाएँ
        if (response) {
          return response;
        }
        // अगर नहीं है, तो नेटवर्क से फ़ेच करें
        return fetch(event.request);
      })
  );
});
