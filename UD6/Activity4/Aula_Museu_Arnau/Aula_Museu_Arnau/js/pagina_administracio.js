import { onSnapshot,collection,db,deleteUser } from "./firebase.js";
let container = $("#container");
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

function printComponentsOnPcLayout () {
  

    onSnapshot(collection(db,"users"),  (querySnapshot)=> {
        $("#users-list tbody").empty();
        querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        
                const user = doc.data();

                if(user.active == "1"){
               
                    $("#users-list").append(`<tr class='user' id=user_${doc.id}></tr>`);
            
                    $(`#users-list #user_${doc.id}`).append(`<td>${doc.id}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><img src="../Assets/Imgs/foto_perfil.png" class="foto-perfil"></td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.name}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.email}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><div class="permisions"></div></td>`); 
                        
                        if(user.edit_users == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit users <input  class="check-box-permisos" type="checkbox" checked> </label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit users<input class="check-box-permisos" type = "checkbox" ></label> `); 
                        }
                    
                        if(user.edit_news == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit news<input class="check-box-permisos" type = "checkbox" checked></label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit news<input class="check-box-permisos" type = "checkbox" ></label> `); 
                        }
            
                        if(user.edit_bones_files == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit bones files<input class="check-box-permisos" type = "checkbox" checked></label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit bones files<input class="check-box-permisos" type = "checkbox"></label> `); 
                        }
            
                        $(`#users-list #user_${doc.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
                

                }    
              
                
        })

       
})

}

function printComponentsOnMobileLayout() {
   
    onSnapshot(collection(db,"users"),  (querySnapshot)=> {
        $("#users-list tbody").empty();
        let html="";
        querySnapshot.forEach((doc) => {
          
                const user = doc.data();
               if(user.active == "1"){
                    $("#users-list").append(`<tr class='user' id=user_${doc.id}></tr>`);
            
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.name}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.email}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
                
                 }
                
        })

       
})
    
}

$(()=>{

    console.log(users.length);
    $('<button class="btn-create-user"> Crear Usuari </button>').insertBefore("#users-list");
    
    $(document).on('click', '.btn-create-user', ()=> {
        setTimeout(()=>window.location.href="../pages/crear_usuari.html",1000);
    })

    $(document).on('click', '.fa-pencil', function (){
        let pare = $(this).closest("tr")[0];
        let id = pare.id.replace("user_","");
        window.location.href = `../pages/editar_usuari.html?userId=${encodeURIComponent(id)}`;
    })

    $(document).on('click', '.fa-trash',function (){
        
        let pare = $(this).closest("tr")[0];
        let id = pare.id.replace("user_","");
        // console.log(id)
        deleteUser(id + "");

    })

    function updateLayout() {
        if ($(window).width() >= 860) {
            printComponentsOnPcLayout();
        } else {
            printComponentsOnMobileLayout();
        }
    }

    updateLayout();
    $(window).on('resize', updateLayout )

})
