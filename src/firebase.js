// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKo4-FWnXGA2bQZS6vXMIhB0Hz5uzAAjo",
  authDomain: "kanban-app-2daa3.firebaseapp.com",
  projectId: "kanban-app-2daa3",
  storageBucket: "kanban-app-2daa3.firebasestorage.app",
  messagingSenderId: "40990185071",
  appId: "1:40990185071:web:5bc18080b77dc353359f9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;