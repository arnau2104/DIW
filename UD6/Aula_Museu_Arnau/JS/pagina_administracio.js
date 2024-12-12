let container = $("#container");
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

$(()=>{

    $('<button class="btn-create-user"> Crear Usuari </button>').insertBefore("#users-list");
    $.each(users, function (index,user) {
        console.log(user.name);
        $("#users-list").append(`<tr class='user' id=user_${user.id}></tr>`);
        
        $(`#users-list #user_${user.id}`).append(`<td>${user.id}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td>${user.name}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td>${user.email}</td>`); 
        $(`#users-list #user_${user.id}`).append(`<td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>`); 
         
    });

})
