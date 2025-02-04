 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 import { getFirestore, collection, doc, getDocs ,setDoc } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js';  


 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBsV_Hagj3OhT3vUZK0ZIspklvRPXFB250",
   authDomain: "aula-museu.firebaseapp.com",
   projectId: "aula-museu",
   storageBucket: "aula-museu.firebasestorage.app",
   messagingSenderId: "673120048714",
   appId: "1:673120048714:web:2d60bb97d04accc53838b3"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getFirestore();

 export const saveNews = async (id,news_title,autor,news_date,news_content,news_cover,status)=> {
    try {
        await setDoc(doc(db, "news", id), {
            news_title,
            autor,
            news_date,
            news_content,
            news_cover,
            status
        });
        console.log("News saved with custom ID:", id);
      } catch(error) {
        console.log("error saving news with custom ID:", error)
      }
    

}



export const getNews = async ()=> {
    const snapshot = await getDocs(collection(db,"news"));
    return snapshot.docs.map(doc => doc.data()); // Devuelve los datos de las tareas
  } 