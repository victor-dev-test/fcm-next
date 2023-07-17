import firebase from "firebase/app";
import localforage from "localforage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {firebaseConfig, vapidKey} from '../config/config'
import {onMessage} from 'firebase/messaging'

const firebaseApp = {
  init: async () => {
    if (!firebase?.apps?.length) {
      firebase?.initializeApp(firebaseConfig);

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        if (tokenInLocalForage !== null) {
          console.log("🚀 ~ file: useFCM.js:18 ~ tokenInLocalForage:", tokenInLocalForage)

          return tokenInLocalForage
        }

        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          const fcm_token = await messaging.getToken({
            vapidKey
          });
          if (fcm_token) {
            console.log("🚀 ~ file: useFCM.js:26 ~ fcm_token:", fcm_token)
            localforage.setItem("fcm_token", fcm_token);
            // handle call api upload token, bizapp, user info here
            return fcm_token
          }
        }
      } catch (error) {
        console.log('FCM init Failed')
        return null
      }
    }
  },
};


export const useFCM = () => {

    const getFCMMessage = () => {
        const messaging = firebase.messaging();
        messaging.onMessage(msg =>{ toast(`${msg?.notification?.title}-body: ${msg?.notification?.title}`)})

      }

    const requestToken = async () => {
        try {
          const token = await firebaseApp.init();
          if (token) {
            getFCMMessage();
          }
        } catch (error) {
          console.log('get FCM token failed', error);
        }
      }

    useEffect(() => {
        requestToken();
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.addEventListener("message", (event) => {
            console.log(event)
           // handle service worker if needed
          });
        }
    
      });

    return null
}
