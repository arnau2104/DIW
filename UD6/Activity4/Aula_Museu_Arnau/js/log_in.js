import { saveUser,onSnapshot,collection,db } from "./firebase.js";
import {generarSalt,encryptPassword} from "./users.js";
let users = [];
onSnapshot(collection(db,"users"),  (querySnapshot)=> {
    users = [];
    querySnapshot.forEach((doc) => {
       users.push([doc.id,doc.data()]);
    })
 
 }) 

let inputEmail = $("#email");
let inputPassword = $("#password");
let form = $("form");
let user_loged;
let label_repeated_password = $("#label_repeated_password");
let repeated_password = $("#repeated_password");

function esEmailValid(input) {
    // javascript validació email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(input).toLowerCase()); // retorna true o flase  
}

function validPassword(password) {
    var tieneMayuscula = /[A-Z]/.test(password);
    var tieneMinuscula = /[a-z]/.test(password);
    var tieneNumero = /\d/.test(password);
    var tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial) {
        return true; 
    } else {
        return false; 
    }
}





function emailComprobation(inputEmail) {
    let emailCorrecte = false;
    if(esEmailValid(inputEmail.val()) == true) {    
            
        $.each(users ,function (index,user) {
            console.log(user)
            console.log(user[1].email)
            if(inputEmail.val() === user[1].email) {
                inputEmail.removeClass("incorrecte");
                inputEmail.addClass("correcte");
                console.log("email correcte");
                emailCorrecte = true;
                return false;
                
            }else {
                inputEmail.removeClass("correcte");
                inputEmail.addClass("incorrecte");
                console.log("email incorrecte");
                emailCorrecte = false;
                
            };

        });

    }else {
        console.log("email no valid");
        inputEmail.removeClass("correcte");
        inputEmail.addClass("incorrecte");
        $(".email .errorMessage").text("Email no valid");
    }

    return emailCorrecte;
}

function comparePasswords(password) {

    let passwordMatch = false;

    $.each(users,function (index,user){
       
    let encryptedInput = encryptPassword(password,user[1].salt);

        if(encryptedInput === user[1].password) {
            
            console.log("Contrasenya correcte");
            passwordMatch = true;
            user_loged = user;
            return false;
        }else {
           
            console.log("Contrasenya incorrecte");
            console.log(encryptedInput);
            console.log(user[1].password);
            
        };
    });

    return passwordMatch;
}

$(()=> {

    
    

    inputEmail.on("blur" , (e)=> {
        
        
        if(esEmailValid(inputEmail.val()) == false) {
            $(".email .errorMessage").show(); 
            $(".email .errorMessage").text("Email no valid");
        }else {
            $(".email .errorMessage").hide(); 
        };

       
    });

  

    form.on("submit" , (e)=> {
        e.preventDefault();
  
        if(repeated_password.val().length > 0) {
            if(repeated_password.val().length >= 12 && validPassword(inputPassword.val()) == true) {
                if(repeated_password.val() == inputPassword.val()) {

                    let salt = generarSalt();
                    let changedPassword = encryptPassword(inputPassword.val(),salt);

                    user_loged[1].password = changedPassword;
                    user_loged[1].salt = salt;
                    user_loged[1].is_first_login = 0;

                    $.each(users,function (index,user){
                        if(+user[0] == user_loged[0]) {
                            console.log(user);
                           
                            console.log(user);

                            
                            saveUser(user_loged[0] +"",user_loged[1].name,user_loged[1].email,user_loged[1].password,user_loged[1].salt,user_loged[1].edit_users,user_loged[1].edit_news,user_loged[1].edit_bone_files,user_loged[1].active,user_loged[1].is_first_login)

                            return false;
                        }
                    })

                    $(".log-in-result").text("Login successful").addClass("correcte").removeClass("incorrecte");
                    localStorage.setItem("userLoged",JSON.stringify(user_loged) )
                     setTimeout(()=>window.location.href="../pages/pagina_administracio.html",1000);
                }
            }else {
                $(".password .errorMessage").text("The password needs minimum 12 characters, it must contain uppercase and lowercase letters, numbers and special characters.");
                $(".log-in-result").text("")
            }
        }

       else if(emailComprobation(inputEmail)==true && comparePasswords(inputPassword.val()) == true) {
        console.log("login done");

        console.log(user_loged)
        console.log(repeated_password.val().length)
       console.log( user_loged[1].is_first_log_in == 1)
        if(repeated_password.val().length == 0 && user_loged[1].is_first_log_in == 1) {
            inputPassword.val("");
            label_repeated_password.show();
            repeated_password.show();
       
        }else {
            $(".log-in-result").text("Login successful").addClass("correcte").removeClass("incorrecte");
            localStorage.setItem("userLoged",JSON.stringify(user_loged) )
            setTimeout(()=>window.location.href="../pages/pagina_administracio.html",1000);
            // label_repeated_password.hide();
            // repeated_password.hide();
        }

       
       }else {
        console.log("login fail");
        $(".log-in-result").text("Invalid username o password").addClass("incorrecte").removeClass("correcte");
       }


        
    })

    

})