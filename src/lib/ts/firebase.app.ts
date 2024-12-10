// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAQss35zR0QBonSiQRDrn13ky_Fv8rf6kQ',
    authDomain: 'iuis-v2.firebaseapp.com',
    projectId: 'iuis-v2',
    storageBucket: 'iuis-v2.firebasestorage.app',
    messagingSenderId: '586224800415',
    appId: '1:586224800415:web:251915971b138cb26488aa',
    measurementId: 'G-C12EEVFGXD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
