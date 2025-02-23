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

                
               
                    $("#users-list").append(`<tr class='user' id=user_${doc.id}></tr>`);
            
                    $(`#users-list #user_${doc.id}`).append(`<td>${doc.id}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><img src="../Assets/Imgs/foto_perfil.png" class="foto-perfil"></td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.name}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.email}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><div class="permisions"></div></td>`); 
                        
                        if(user.edit_users == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit users ✅ </label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit users  ❌</label> `); 
                        }
                    
                        if(user.edit_news == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit news  ✅</label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit news ❌</label> `); 
                        }
            
                        if(user.edit_bone_files == 1) {    
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit bones files ✅</label> `); 
                        }else {
                            $(`#users-list #user_${doc.id} .permisions`).append(`<label>Edit bones files ❌</label> `); 
                        }
            
                        $(`#users-list #user_${doc.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`);  
              
                
        })

       
})

}

function printComponentsOnMobileLayout() {
   
    onSnapshot(collection(db,"users"),  (querySnapshot)=> {
        $("#users-list tbody").empty();
        let html="";
        querySnapshot.forEach((doc) => {
          
                const user = doc.data();
              
                    $("#users-list").append(`<tr class='user' id=user_${doc.id}></tr>`);
            
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.name}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td>${user.email}</td>`); 
                    $(`#users-list #user_${doc.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
                
                
        })

       
})
    
}

$(()=>{

    

    // console.log(users.length);
    $('<button class="btn-create-user"> Crear Usuari </button>').insertBefore("#users-list");
    
    $(document).on('click', '.btn-create-user', ()=> {
        setTimeout(()=>window.location.href="../pages/crear_usuari.html",1000);
    })

    $(document).on('click', '.fa-pencil', function (){
        let pare = $(this).closest("tr")[0];
        let id = pare.id.replace("user_","");
        window.location.href = `../pages/editar_usuari.html?userId=${encodeURIComponent(id)}`;
    })

    let pare;
    $(document).on('click', '.fa-trash',function (){
        pare = $(this).closest("tr")[0];
        let id = pare.id.replace("user_","");
       
        if(id !== '1') {
        $('#container').append(`
            <div class="confirmacio-borrar-usuari">
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <p>Estas segur que vols borrar l'usuari?</p>
                    <button class="btn-confirmacio-borrar">Borrar</button>
                </div>
            `)
        }
        

    })

    $(document).on('click', '.btn-confirmacio-borrar', function () {
       
        let id = pare.id.replace("user_","");
        console.log(id)
        if(id !== '1') {
         deleteUser(id + "");
        }
        $('.confirmacio-borrar-usuari').remove();
    })

    $(document).on('click', '.confirmacio-borrar-usuari .fa-times', function(){
      
        $('.confirmacio-borrar-usuari').remove();
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
