
let sliderRange = document.getElementById("sliderRange");
let rangeValue = document.getElementById("rangeValue");
let accesibilityIcon = document.getElementById('accesibilityIcon');
let accesibility = document.querySelector(".accesibility");
let close = document.querySelector(".accesibility .fa-times");
let darkContrast = document.querySelector(".dark-contrast");
// let logo = document.querySelector(".logo");
let lightContrast = document.querySelector(".light-contrast");
let highSaturation = document.querySelector(".high-saturation");
let lowSaturation = document.querySelector(".low-saturation");
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let greyScale = document.querySelector(".grey-scale"); 
console.log("js cargat");


// Al cargar la página, aplica el modo oscuro si estaba habilitado
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }else if (localStorage.getItem("highSaturation") === "enabled") {
        header.classList.add("high-saturation");
        main.classList.add("high-saturation");
        footer.classList.add("high-saturation");
        };
    

    accesibilityIcon.addEventListener('click' ,()=>{
        console.log("click btn access");

        accesibility.classList.toggle("active");
    });
    
    close.addEventListener('click', ()=>{
        accesibility.classList.toggle("active");
    });
    
    rangeValue.innerText = sliderRange.value;
    
    sliderRange.oninput = function(){
        rangeValue.innerText = sliderRange.value;
    };
    
    //darkcontrast
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
     
    
    //lightcontrast
    lightContrast.addEventListener('click', ()=>{
        document.body.classList.remove("dark-mode");
        accesibility.classList.toggle("active");
        localStorage.setItem("darkMode", "disabled");
    
    });
    
    //Posar clase high-saturation 
    highSaturation.addEventListener('click', ()=>{
        header.classList.toggle("high-saturation");
        main.classList.toggle("high-saturation");
        footer.classList.toggle("high-saturation");
       
        accesibility.classList.toggle("active");
        console.log("dins");
    
        if (header.classList.contains("high-saturation")) {
            localStorage.setItem("highSaturation", "enabled");
        } else {
            localStorage.setItem("highSaturation", "disabled");
        };
        
    
    });

    lowSaturation.addEventListener('click', ()=>{
        header.classList.toggle("low-saturation");
        main.classList.toggle("low-saturation");
        footer.classList.toggle("low-saturation");
        accesibility.classList.toggle("active");
        console.log("low saturation");
    });

    greyScale.addEventListener('click', ()=>{
        header.classList.toggle("grey-scale");
        main.classList.toggle("grey-scale");
        footer.classList.toggle("grey-scale");
        accesibility.classList.toggle("active");
        console.log("grey-scale");
    });


});



