// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkC9v8O_Wh_AVvh2u6UGnpHFpRzASlxek",
  authDomain: "fintrack-f100a.firebaseapp.com",
  projectId: "fintrack-f100a",
  storageBucket: "fintrack-f100a.appspot.com",
  messagingSenderId: "873898082945",
  appId: "1:873898082945:web:22990277e1de2f89854380",
  measurementId: "G-KPRXBN88LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
