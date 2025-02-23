import { getDocs,createUserWithEmailAndPassword,auth,saveUser,onSnapshot,collection,db } from "./firebase.js";

const urlParams = new URLSearchParams(window.location.search);
const idToEdit = urlParams.get("userId");
console.log( typeof idToEdit);

let nom = $("#nom");
let email = $("#email");;
let edit_users = $("#edit_users");
let edit_news = $("#edit_news");
let edit_bone_files = $("#edit_bone_files");
let status = $("#status");
let btnEditarUsuari = $("#btn-editar-usuari");

let users = []
const querySnapshot =  await getDocs(collection(db, "users")); 
querySnapshot.forEach((doc) => {
    users.push([doc.id, doc.data()]);
});
let user = users.find(user => user[0]== idToEdit);

    // console.log(user);


        btnEditarUsuari.prop('disabled',true);
        $(document).ready(()=> {
            console.log(user);
             nom.val(user[1].name);
             email.val(user[1].email);
             user[1].edit_users == 1 ? edit_users.prop('checked',true) :  edit_users.prop('checked',false);
             user[1].edit_news == 1 ? edit_news.prop('checked',true) :  edit_news.prop('checked',false);
             user[1].edit_bone_files == 1 ? edit_bone_files.prop('checked',true) :  edit_bone_files.prop('checked',false);
             user[1].active == "1" ?  status.prop("selectedIndex", 0) : status.prop("selectedIndex", 1);

             btnEditarUsuari.prop('disabled',false);
    
        })

        $('#btn-editar-usuari').on('click', (e)=> {
            e.preventDefault();

            if(nom.val() && email.val() && btnEditarUsuari.prop('disabled',false)) {
                 saveUser(idToEdit,nom.val(),email.val(),user[1].password, user[1].salt,edit_users.prop('checked') ? 1 : 0,edit_news.prop('checked') ? 1 : 0,edit_bone_files.prop('checked') ? 1 : 0, status.val(), user[1].is_first_log_in);
                $(".missatge").text("Modificat correctament!").css("color", "green");
                 setTimeout(()=> window.location.href = "./pagina_administracio.html", 2000);

            }else {
                $(".missatge").text("Error: Ompliu tots els camps").css("color", "red");
            }
        })
