
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
let lineSpacingSmall = document.getElementById("spacingSmall");
let lineSpacingNormal = document.getElementById("spacingNormal");
let lineSpacingLarge = document.getElementById("spacingLarge");
let lineSpacingExtraLarge = document.getElementById("spacingExtraLarge");

let wordSpacingSmall = document.getElementById("wordSpacingSmall");
let wordSpacingNormal = document.getElementById("wordSpacingNormal");
let wordSpacingLarge = document.getElementById("wordSpacingLarge");
let wordSpacingExtraLarge = document.getElementById("wordSpacingExtraLarge");

let letterSpacingSmall = document.getElementById("letterSpacingSmall");
let letterSpacingNormal = document.getElementById("letterSpacingNormal");
let letterSpacingLarge = document.getElementById("letterSpacingLarge");
let letterSpacingExtraLarge = document.getElementById("letterSpacingExtraLarge");

let pageElements = document.querySelectorAll('*');
const originalSizes = Array.from(pageElements).map(element => parseFloat(getComputedStyle(element).fontSize));

let defaultValues = document.getElementById("default-values");


// Al cargar la página, aplica el modo oscuro si estaba habilitado
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }else if (localStorage.getItem("highSaturation") === "enabled") {
        header.classList.add("high-saturation");
        main.classList.add("high-saturation");
        footer.classList.add("high-saturation");
        } else if(localStorage.getItem("lowSaturation") == 'enabled') {
            header.classList.toggle("low-saturation");
            main.classList.toggle("low-saturation");
            footer.classList.toggle("low-saturation");
            accesibility.classList.toggle("active");
        } else if(localStorage.getItem("greyScale") == "enabled") {
            header.classList.toggle("grey-scale");
            main.classList.toggle("grey-scale");
            footer.classList.toggle("grey-scale");
        };
    

    accesibilityIcon.addEventListener('click' ,()=>{
        console.log("click btn access");

        accesibility.classList.toggle("active");
    });
    
    close.addEventListener('click', ()=>{
        accesibility.classList.toggle("active");
    });
    
    
    
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
       
        if (header.classList.contains("low-saturation")) {
            localStorage.setItem("lowSaturation", "enabled");
        } else {
            localStorage.setItem("lowSaturation", "disabled");
        };

    });

    greyScale.addEventListener('click', ()=>{
        header.classList.toggle("grey-scale");
        main.classList.toggle("grey-scale");
        footer.classList.toggle("grey-scale");
        accesibility.classList.toggle("active");
       
        if (header.classList.contains("grey-scale")) {
            localStorage.setItem("greyScale", "enabled");
        } else {
            localStorage.setItem("greyScale", "disabled");
        };

    });

    //line spacing
    lineSpacingSmall.addEventListener('click',()=>{
        header.style.lineHeight = "normal";
        main.style.lineHeight = "normal";
        footer.style.lineHeight = "normal";
        accesibility.classList.toggle("active");
    });

    lineSpacingNormal.addEventListener('click',()=>{
        header.style.lineHeight = 1.7 + "em";
        main.style.lineHeight = 1.7 + "em";
        footer.style.lineHeight = 1.7 + "em";
        accesibility.classList.toggle("active");
    });

    lineSpacingLarge.addEventListener('click',()=>{
        header.style.lineHeight = 2.2 + "em";
        main.style.lineHeight = 2.2 + "em";
        footer.style.lineHeight = 2.2 + "em";
        accesibility.classList.toggle("active");
    });

    lineSpacingExtraLarge.addEventListener('click',()=>{
        header.style.lineHeight = 2.5 + "em";
        main.style.lineHeight = 2.5 + "em";
        footer.style.lineHeight = 2.5 + "em";
        accesibility.classList.toggle("active");
        console.log("extra large");
    });

    //word spacing
    wordSpacingSmall.addEventListener('click',()=>{
        header.style.wordSpacing= "normal";
        main.style.wordSpacing= "normal";
        footer.style.wordSpacing= "normal";
        accesibility.classList.toggle("active");
    });

    wordSpacingNormal.addEventListener('click',()=>{
        header.style.wordSpacing = 0.6 + "em";
        main.style.wordSpacing = 0.6 + "em";
        footer.style.wordSpacing = 0.6 + "em";
        accesibility.classList.toggle("active");
    });

   wordSpacingLarge.addEventListener('click',()=>{
        header.style.wordSpacing = 1.1 + "em";
        main.style.wordSpacing = 1.1 + "em";
        footer.style.wordSpacing = 1.1 + "em";
        accesibility.classList.toggle("active");
    });

    wordSpacingExtraLarge.addEventListener('click',()=>{
        header.style.wordSpacing = 1.4 + "em";
        main.style.wordSpacing = 1.4 + "em";
        footer.style.wordSpacing = 1.4 + "em";
        accesibility.classList.toggle("active");
        console.log("extra large");
    });

    //letter spacing
    letterSpacingSmall.addEventListener('click',()=>{
        header.style.letterSpacing= "normal";
        main.style.letterSpacing= "normal";
        footer.style.letterSpacing= "normal";
        accesibility.classList.toggle("active");
    });

    letterSpacingNormal.addEventListener('click',()=>{
        header.style.letterSpacing = 0.2 + "em";
        main.style.letterSpacing = 0.2 + "em";
        footer.style.letterSpacing = 0.2 + "em";
        accesibility.classList.toggle("active");
    });

    letterSpacingLarge.addEventListener('click',()=>{
        header.style.letterSpacing = 0.3 + "em";
        main.style.letterSpacing = 0.3 + "em";
        footer.style.letterSpacing = 0.3 + "em";
        accesibility.classList.toggle("active");
    });

    letterSpacingExtraLarge.addEventListener('click',()=>{
        header.style.letterSpacing = 0.4 + "em";
        main.style.letterSpacing = 0.4 + "em";
        footer.style.letterSpacing = 0.4 + "em";
        accesibility.classList.toggle("active");
        console.log("extra large");
    });

    defaultValues.addEventListener('click',()=> {
        //put the default font size
        sliderRange.value = 5;
        
        //default line spacing
        document.body.style.lineHeight = 'normal';
        
        //default word spacing
        document.body.style.wordSpacing = 'normal';

         //default letter spacing
         document.body.style.letterSpacing = 'normal';

         localStorage.clear();
         location.reload();
    })


});



rangeValue.innerText = sliderRange.value;
    
    sliderRange.oninput = function(){
        rangeValue.innerText = sliderRange.value;
        
       chaneFontSize(sliderRange.value);
    };

    function chaneFontSize(size) {
         
        pageElements.forEach((element, index) => {
       

          
        // Take the original font-size of the element
        const originalSize = originalSizes[index];
       

        let newSize;
        if (size < 5) {
            // if size is small than 5 reduce the size
            newSize = originalSize * (1 - (5 - size) * 0.05); 
        } else if (size > 5) {
            //if size is bigger than 5 increase the size
            newSize = originalSize * (1 + (size - 5) * 0.06); 
        } else {
            // if size is equals to 5 keep the size
            newSize = originalSize;
        }
        // Aplica el nuevo tamaño de fuente al elemento
        element.style.fontSize = `${newSize}px`;
    
    })
};
