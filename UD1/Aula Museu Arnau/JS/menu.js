document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".mobile-menu");
    const displayedMenu = document.querySelector("#menu-click");
    const menuClick = document.querySelector(".close-menu");
    const userMenu = document.querySelector(".fa-user");
    const userMenuClick = document.querySelector(".user-menu-click");
    const userMenuClose = document.querySelector(".close-menu-user");
  
    //Mostrar menu
    menuIcon.addEventListener("click", function() {
        displayedMenu.classList.toggle("active");
    });
   
    //Tancar menu
    menuClick.addEventListener("click", function() {
        displayedMenu.classList.toggle("active");
    });

    //Mostrar menu usuari
    userMenu.addEventListener("click",function(){
        userMenuClick.classList.toggle("active")
    })

    //Tancar menu usuari
    userMenuClose.addEventListener("click",function(){
        userMenuClick.classList.toggle("active")
    })
  });