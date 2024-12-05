let users = JSON.parse(localStorage.getItem("users"));
let inputEmail = $("#email");
    let inputPassword = $("#password");
    let form = $("form");

function esEmailValid(input) {
    // javascript validació email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(input).toLowerCase()); // retorna true o flase  
}





function emailComprobation(inputEmail) {
    let emailCorrecte = false;
    if(esEmailValid(inputEmail.val()) == true) {    
            
        users.forEach((user)=> {

            if(inputEmail.val() === user.email) {
                inputEmail.removeClass("incorrecte");
                inputEmail.addClass("correcte");
                console.log("email correcte");
                emailCorrecte = true;
                
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

    

    users.forEach((user)=> {
       
    let encryptedInput = encryptPassword(password,user.salt);

        if(encryptedInput == user.password) {
            inputPassword.removeClass("incorrecte");
            inputPassword.addClass("correcte");
            console.log("Contrasenya correcte");
        }else {
            inputPassword.removeClass("correcte");
            inputPassword.addClass("incorrecte");
            console.log("Contrasenya incorrecte");
            console.log(encryptedInput);
            console.log(user.password);
            console.log(desencryptPassword(encryptedInput, user.salt));
            console.log(desencryptPassword(user.password, user.salt));
        };
    });
}

$(()=> {

    
    

    // inputEmail.on("blur" , (e)=> {
        
        
    //     // if(esEmailValid(inputEmail) == false) {
    //     //     $(".email .errorMessage").text("Email no valid");
    //     // };

       
    // });

  

    form.on("submit" , (e)=> {
        e.preventDefault();
        // emailComprobation(inputEmail);
        comparePasswords();
    //    if(emailComprobation(inputEmail)==true && comparePasswords(inputPassword) == true) {
    //     console.log("login done");
    //    }else {
    //     console.log("login fail");
    //    }

        
    })

})