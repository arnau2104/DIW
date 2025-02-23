import { createUserWithEmailAndPassword,auth,saveUser,onSnapshot,collection,db } from "./firebase.js";
import {generarSalt,encryptPassword} from "./users.js";

let users = [];
onSnapshot(collection(db,"users"),  (querySnapshot)=> {
   users = [];
   querySnapshot.forEach((doc) => {
      users.push([doc.id,doc.data()]);
   })

}) 


$(document).on('click', "#btn-crear-usuari", async (e)=> {
    e.preventDefault();

    let nom = $("#nom").val();
    let email = $("#email").val();
    let userSalt = generarSalt();
    let password = encryptPassword("Ramis.20",userSalt);
    let edit_users = $("#edit_users").prop('checked') ? 1 : 0;
    let edit_news = $("#edit_news").prop('checked') ? 1 : 0;
    let edit_bone_files = $("#edit_bone_files").prop('checked') ? 1 : 0;
    let status = $("#status").val();

    


    // console.log(nom,email,password,edit_users,edit_news,edit_bone_files,status);

   
     if(nom && email && password && status && userSalt) {

      users.sort((a, b) => a[0] - b[0]);
          // console.log(users)
            let lastId = users.length > 0 ? +users[users.length - 1][0] : 0;
            // console.log(lastId + 1);
            
         
         saveUser((lastId + 1) + "",nom,email,password,userSalt,edit_users,edit_news,edit_bone_files,status,1);
         //   createUserWithEmailAndPassword(auth,email,password);    
         

         //reset form
         setTimeout(()=>{
            $("#nom").val("");
            $("#email").val("");
            // $("#password").val("");
            $("#edit_users").prop('checked',false); 
            $("#edit_news").prop('checked',false);
            $("#edit_bone_files").prop('checked',false);
            $("#status").prop("selectedIndex", 0);
         },1000)
        


     }else {
        console.log("Rellene todos los campos")
     }


})
