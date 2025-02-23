let userLoged = JSON.parse(localStorage.getItem('userLoged'));
console.log(typeof userLoged[1].edit_users);

 if(userLoged[1].edit_users !== 1) {
    $('.pagina-administracio').hide()
 }else {
    $('.pagina-administracio').show()
 }

