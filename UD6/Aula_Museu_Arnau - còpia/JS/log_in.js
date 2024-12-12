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

    let passwordMatch = false;

    users.forEach((user)=> {
       
    let encryptedInput = encryptPassword(password,user.salt);

        if(encryptedInput === user.password) {
            
            console.log("Contrasenya correcte");
            passwordMatch = true;
        }else {
           
            console.log("Contrasenya incorrecte");
            console.log(encryptedInput);
            console.log(user.password);
            
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
  
       if(emailComprobation(inputEmail)==true && comparePasswords(inputPassword.val()) == true) {
        console.log("login done");
        $(".log-in-result").text("Login successful").addClass("correcte").removeClass("incorrecte");
       }else {
        console.log("login fail");
        $(".log-in-result").text("Invalid username o password").addClass("incorrecte").removeClass("correcte");
       }

       users.forEach((user)=>{

       });

        
    })

    

})