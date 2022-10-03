
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD8F6_0VVL8bXJlI0b_Re1QnTBnfgW0d6E",
  authDomain: "todolist-b6bc1.firebaseapp.com",
  projectId: "todolist-b6bc1",
  storageBucket: "todolist-b6bc1.appspot.com",
  messagingSenderId: "289803400327",
  appId: "1:289803400327:web:63753820b959e7dd253422"
};

  const app = initializeApp(firebaseConfig);
  export const db= getFirestore(app)