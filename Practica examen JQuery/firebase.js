 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js"

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD_Qrb-0Quz0yNCNe-tkkpOimjNVEk08eI",
   authDomain: "tasksexam.firebaseapp.com",
   projectId: "tasksexam",
   storageBucket: "tasksexam.firebasestorage.app",
   messagingSenderId: "103037562898",
   appId: "1:103037562898:web:fcd4d2bb8b5c9486aee8cb"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getFirestore();


 export const saveTask = (taskName,taskDescription)=> {
  console.log("sending data");
  addDoc(collection(db,"tasks"),{taskName: taskName,taskDescription});

 }

 export const saveTaskWithId =  async(id,taskName,taskDescription) => {
  await setDoc(doc(db,"tasks",id), {
    taskName,
    taskDescription
  })
 };

 export const deletTask = async (id)=> {
 await deleteDoc(doc(db,"tasks",id));
 }