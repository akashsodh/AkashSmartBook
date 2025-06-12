// आपका दिया गया Firebase कॉन्फ़िगरेशन कोड
const firebaseConfig = {
  apiKey: "AIzaSyDl3G5xTQ7HYZfre5U-GbVQ74zNSCXe8E4",
  authDomain: "akashsmartbook.firebaseapp.com",
  projectId: "akashsmartbook",
  storageBucket: "akashsmartbook.appspot.com",
  messagingSenderId: "110610599234",
  appId: "1:110610599234:web:23b743615f200f00340cdb",
  measurementId: "G-3M2WHFGQJ8"
};

// Firebase को इनिशियलाइज़ करें
firebase.initializeApp(firebaseConfig);

// Auth और Firestore सेवाओं को एक्सेस करने के लिए वेरिएबल्स
const auth = firebase.auth();
const db = firebase.firestore();

// PWA के लिए सर्विस वर्कर को रजिस्टर करें
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}