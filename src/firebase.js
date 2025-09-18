// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfxqSm7fh292ahzqazonKzNVFqCf1iUTI",
    authDomain: "dormitory-b5c67.firebaseapp.com",
    projectId: "dormitory-b5c67",
    storageBucket: "dormitory-b5c67.firebasestorage.app",
    messagingSenderId: "394484010171",
    appId: "1:394484010171:web:2be4078f672a8bcd096d9e",
    measurementId: "G-3XWHVRE1W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };