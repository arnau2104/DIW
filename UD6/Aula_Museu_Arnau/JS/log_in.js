let users = JSON.parse(localStorage.getItem("users"));

function esEmailValid(input) {
    // javascript validació email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(input).toLowerCase()); // retorna true o flase  
}

$(()=> {

    let inputEmail = $("#email");

    inputEmail.on("blur" , (e)=> {
        
     
        
            if(esEmailValid(inputEmail.val()) == true) {    
            
                users.forEach((user)=> {

                    if(inputEmail.val() == user.email) {
                        inputEmail.removeClass("incorrecte");
                        inputEmail.addClass("correcte");
                        console.log("email correcte");
                    }else {
                        inputEmail.removeClass("correcte");
                        inputEmail.addClass("incorrecte");
                        console.log("email incorrecte");
                    };

                });

            }else {
                console.log("email no valid");
                inputEmail.removeClass("correcte");
                inputEmail.addClass("incorrecte");
            }

       
    });

})