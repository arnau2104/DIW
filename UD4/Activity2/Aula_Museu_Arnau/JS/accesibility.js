let sliderRange = document.getElementById("sliderRange");
let rangeValue = document.getElementById("rangeValue");
let accesibilityIcon = document.getElementById("accesibilityIcon");
let accesibility = document.querySelector(".accesibility");
let close = document.querySelector(".accesibility .fa-times");
let darkContrast = document.querySelector(".dark-contrast");

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
  
});