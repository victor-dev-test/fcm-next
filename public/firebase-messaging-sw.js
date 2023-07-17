importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

 //the Firebase config object 
const firebaseConfig = {
    apiKey: "AIzaSyAwKG4e6R8YtpFCS1yOa5mIFZ2zXiBCuDk",
    authDomain: "devproject-27599.firebaseapp.com",
    projectId: "devproject-27599",
    storageBucket: "devproject-27599.appspot.com",
    messagingSenderId: "785105279153",
    appId: "1:785105279153:web:4f6d3517609510b2faaa90",
    measurementId: "G-86Q174BT5T"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();