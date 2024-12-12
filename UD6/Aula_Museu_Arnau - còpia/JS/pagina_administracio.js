let container = $("#container");
let users = JSON.parse(localStorage.getItem("users"));
console.log(users[0].name);

$(()=>{

    $('<button class="btn-create-user"> Crear Usuari </button>').insertBefore("#users-list");
    $.each(users, function (index,user) {
        console.log(user.name);
        $("#users-list").append("<tr class='user'></tr>");
        $("#users-list tr").append(`<td><input type="checkbox" class="user-selected"></td>`); 
        $("#users-list tr").append(`<td>${user.id}</td>`); 
        // $("#users-list tr").append(`<td>${user.name}</td>`); 
        $("#users-list tr").append(`<td>${user.email}</td>`); 
        $("#users-list tr").append(`<td>Ramis20.</td>`);  
        $("#users-list tr").append(`<td class="permisos"> <div>  </div></td>`);
        if(user.edit_users == 1 ) {
            $(".permisos div").append(`<label>Edit users<input type="checkbox" name="edit_users" value="edit_users" checked ></label>`);
        }else {
            $(".permisos div").append(`<label>Edit users<input type="checkbox" name="edit_users" value="edit_users"></label>`);
        }
        
        //if the user have the permission show the ckeckbox checked, else show not checked
        if(user.edit_news == 1 ) {
            $(".permisos div").append(`<label>Edit news <input type="checkbox" name="edit_news" value="edit_news" checked ></label>`);
        }else {
            $(".permisos div").append(`<label>Edit users<input type="checkbox" name="edit_users" value="edit_users"></label>`);
        }
        if(user.edit_bones_files == 1 ) {
            $(".permisos div").append(`<label>Edit bones files <input type="checkbox" name="edit_bones_file" value="edit_bones_files" checked ></label>`);
        }else {
            $(".permisos div").append(`<label>Edit users<input type="checkbox" name="edit_bones_file" value="edit_bones_file"></label>`);
        }  
         
    });

})