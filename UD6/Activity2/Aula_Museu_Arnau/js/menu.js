document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".mobile-menu");
    const displayedMenu = document.querySelector("#menu-click");
    const menuClick = document.querySelector(".close-menu");
    const userMenu = document.querySelector(".fa-user");
   
  
    //Mostrar menu
    menuIcon.addEventListener("click", function() {
        displayedMenu.classList.toggle("active");
    });
   
    //Tancar menu
    menuClick.addEventListener("click", function() {
        displayedMenu.classList.toggle("active");
    });

  
  });