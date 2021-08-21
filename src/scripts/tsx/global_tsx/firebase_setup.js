import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDh02xdVEfBeqmH33tJb400jZILLmmHL0g",
  authDomain: "localhost/3000",
  databaseURL:
    "https://prototype-ae9eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prototype-ae9eb",
  storageBucket: "prototype-ae9eb.appspot.com",
  messagingSenderId: "122319683458",
  appId: "1:122319683458:web:0364b2f50fde6ac375d99b",
  measurementId: "G-QQNVL34DYB",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
