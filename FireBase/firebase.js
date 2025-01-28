// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ19znrY3kpUk642hoG3TtTyV2GtRPhaQ",
  authDomain: "tasks-prova.firebaseapp.com",
  projectId: "tasks-prova",
  storageBucket: "tasks-prova.firebasestorage.app",
  messagingSenderId: "20919134131",
  appId: "1:20919134131:web:aee854917b0d01ec8ecdc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();


export const saveTask = (title,description,priority) => {
    addDoc(collection(db,"tasks"), {title,description, priority});
}

export const getTasks = ()=> {
  return getDocs(collection(db,"tasks"));
} 

export {
  onSnapshot,collection,db
}

export const deleteTasks = (taskToDelete)=> {
  deleteDoc(doc(db,"tasks",taskToDelete));
}