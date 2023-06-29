


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';     // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyByDHNw_frBz6K0JAxqkGalpojP-i6SPy8",
        authDomain: "dairy-37cbb.firebaseapp.com",
        projectId: "dairy-37cbb",
        storageBucket: "dairy-37cbb.appspot.com",
        messagingSenderId: "658474122941",
        appId: "1:658474122941:web:d0dd3dd4d4d6bb941fc1d4",
        measurementId: "G-F64M0D6D1B"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
