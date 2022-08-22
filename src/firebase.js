// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA-xR4YtTEWi0_bjrqRj2t9VVIjT2nNATs",
    authDomain: "whatsapp-2-53ffd.firebaseapp.com",
    projectId: "whatsapp-2-53ffd",
    storageBucket: "whatsapp-2-53ffd.appspot.com",
    messagingSenderId: "437838190723",
    appId: "1:437838190723:web:75d06fd61f085d5154e3b6"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const storage = getStorage(app);
//  const provider  = getGoogleAuthProvider(app);

export {db,auth} ;