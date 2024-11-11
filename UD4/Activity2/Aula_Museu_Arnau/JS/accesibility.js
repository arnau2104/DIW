let sliderRange = document.getElementById("sliderRange");
let rangeValue = document.getElementById("rangeValue");
let accesibilityIcon = document.getElementById("accesibilityIcon");
let accesibility = document.querySelector(".accesibility");
let close = document.querySelector(".accesibility .fa-times");
let darkContrast = document.querySelector(".dark-contrast");
// let logo = document.querySelector(".logo");
let lightContrast = document.querySelector(".light-contrast");
let highSaturation = document.querySelector(".high-saturation");
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");

accesibilityIcon.addEventListener('click' ,()=>{
    accesibility.classList.toggle("active");
});

close.addEventListener('click', ()=>{
    accesibility.classList.toggle("active");
});

rangeValue.innerText = sliderRange.value;

sliderRange.oninput = function(){
    rangeValue.innerText = sliderRange.value;
};

darkContrast.addEventListener('click' , ()=>{

    document.body.classList.toggle("dark-mode");
    accesibility.classList.toggle("active");
    // logo.setAttribute ('src', './Assets/Imgs/logo_clar.png');
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    };
  
});
 


lightContrast.addEventListener('click', ()=>{
    document.body.classList.remove("dark-mode");
    accesibility.classList.toggle("active");
    localStorage.setItem("darkMode", "disabled");

});

//Posar clase high-saturation al body
highSaturation.addEventListener('click', ()=>{
    header.classList.toggle("high-saturation");
    main.classList.toggle("high-saturation-main");
    footer.classList.toggle("high-saturation");
    accesibility.classList.toggle("active");
    console.log("dins");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("highsaturation", "enabled");
    } else {
        localStorage.setItem("highSaturation", "disabled");
    };
    

});



// Al cargar la página, aplica el modo oscuro si estaba habilitado
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }else if (localStorage.getItem("highSaturation") === "enabled") {
        document.body.classList.add("high-saturation");
        };
    });
// Al cargar la página, aplica el modo oscuro si estaba habilitado


