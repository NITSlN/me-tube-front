import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB1fqS0ovN73agDaO5-Y7uKyaiKRBFsbGc",
  authDomain: "me-tube-e42aa.firebaseapp.com",
  projectId: "me-tube-e42aa",
  storageBucket: "me-tube-e42aa.appspot.com",
  messagingSenderId: "324612551722",
  appId: "1:324612551722:web:4ac9f533f57cf065bcff53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app