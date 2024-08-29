// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB80fTf2Y2uaVDU-AUAN9sJNYqUTAr4l60",
    authDomain: "pantry-tracking-3bea3.firebaseapp.com",
    projectId: "pantry-tracking-3bea3",
    storageBucket: "pantry-tracking-3bea3.appspot.com",
    messagingSenderId: "828941450282",
    appId: "1:828941450282:web:3d6380366e0569c6849753",
    measurementId: "G-Z9MWL61T38"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 
