document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".mobile-menu");
    const displayedMenu = document.querySelector("#menu-click");
    const menuClick = document.querySelector(".fa-times");
    const userMenu = document.querySelector(".fa-user");
    const userMenuClick = document.querySelector(".user-menu-click");
  
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
  });