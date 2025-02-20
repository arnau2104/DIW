import { createUserWithEmailAndPassword,auth,saveUser } from "./firebase.js";


$(document).on('click', "#btn-crear-usuari", async (e)=> {
    e.preventDefault();

    let nom = $("#nom").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let edit_users = $("#edit_users").prop('checked') ? 1 : 0;
    let edit_news = $("#edit_news").prop('checked') ? 1 : 0;
    let edit_bone_files = $("#edit_bone_files").prop('checked') ? 1 : 0;
    let status = $("#status").val();

    // console.log(nom,email,password,edit_users,edit_news,edit_bone_files,status);

   
     if(nom && email && password && status) {

    
        saveUser("2",nom,email,password,"",edit_users,edit_news,edit_bone_files,status,1);

        createUserWithEmailAndPassword(auth,email,password);

     }else {
        console.log("Rellene todos los campos")
     }


})