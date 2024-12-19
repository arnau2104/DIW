let container = $("#container");
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

function printComponentsOnPcLayout() {
    $("#users-list").empty();

    $.each(users, function (index,user) {
        $("#users-list").append(`<tr class='user' id=user_${user.id}></tr>`);
        
        $(`#users-list #user_${user.id}`).append(`<td>${user.id}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td><img src="../Assets/Imgs/foto_perfil.png" class="foto-perfil"></td>`); 
        $(`#users-list #user_${user.id}`).append(`<td>${user.name}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td>${user.email}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td><div class="permisions"></div></td>`); 
            
            if(user.edit_users == 1) {    
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit users<input type = "checkbox" checked></label> `); 
            }else {
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit users<input type = "checkbox" ></label> `); 
            }
           
            if(user.edit_news == 1) {    
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit news<input type = "checkbox" checked></label> `); 
            }else {
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit news<input type = "checkbox" ></label> `); 
            }

            if(user.edit_bones_files == 1) {    
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit bones files<input type = "checkbox" checked></label> `); 
            }else {
                $(`#users-list #user_${user.id} .permisions`).append(`<label>Edit bones files<input type = "checkbox"></label> `); 
            }

            $(`#users-list #user_${user.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
         
    });
}

function printComponentsOnMobileLayout() {
    $("#users-list").empty();

    
    $.each(users, function (index,user) {
        $("#users-list").append(`<tr class='user' id=user_${user.id}></tr>`);
        
        
        $(`#users-list #user_${user.id}`).append(`<td>${user.name}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td>${user.email}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
         
    });
}

$(()=>{

    console.log(users.length);
    $('<button class="btn-create-user"> Crear Usuari </button>').insertBefore("#users-list");
    

    if($(window).width() >= 860) {
        // console.log("pc mode"); 
        printComponentsOnPcLayout()
        }else {
            printComponentsOnMobileLayout();
        };

    $(window).on('resize', ()=>{

        if($(window).width() >= 860) {
        // console.log("pc mode"); 
        printComponentsOnPcLayout();
        }else {
            printComponentsOnMobileLayout();
        };
    });

})
