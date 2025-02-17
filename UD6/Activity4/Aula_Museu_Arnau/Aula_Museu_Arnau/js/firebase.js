 
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
 import { getFirestore, collection, doc, getDocs ,setDoc,onSnapshot,deleteDoc } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js';  

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDqMjWUbZPYwyAWA37HgXhvEJDiaFJH-hs",
   authDomain: "aula-museu-912b9.firebaseapp.com",
   projectId: "aula-museu-912b9",
   storageBucket: "aula-museu-912b9.firebasestorage.app",
   messagingSenderId: "582513820989",
   appId: "1:582513820989:web:ad7bb9f68ad9e5bc453154"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getFirestore();

 export const saveNews = async (id,news_title,autor,news_date,news_content,news_cover,status)=> {
    try {
      console.log(news_content);
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

export {
  onSnapshot,collection,db
}

export const getNews = async ()=> {
    const snapshot = await getDocs(collection(db,"news"));
    return snapshot.docs.map(doc => doc.data()); // Devuelve los datos de las tareas
  } 

  export const deleteNews = async (newsToDelete)=> {
    await deleteDoc(doc(db,"news",newsToDelete));
  }

  export const saveUsers = async (id,name,email,password,salt,edit_users,edit_news,edit_bone_files,active, is_first_log_in)=> {
    try {
     
        await setDoc(doc(db, "users", id), {
            name,
            email,
            password,
            salt,
            edit_users,
            edit_news,
            edit_bone_files,
            active,
            is_first_log_in
        });
        console.log("User saved with custom ID:", id);
      } catch(error) {
        console.log("Error saving user with custom ID:", error)
      }
}
