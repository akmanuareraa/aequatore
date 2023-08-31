import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWSBxx6ATeA3rO3JOQuyA4vi0HDFvsWr4",
  authDomain: "aequatore-8d500.firebaseapp.com",
  projectId: "aequatore-8d500",
  storageBucket: "aequatore-8d500.appspot.com",
  messagingSenderId: "1086735291239",
  appId: "1:1086735291239:web:4682a9023773503b8715c2",
  measurementId: "G-HWBBGLR3LS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
