let sliderRange = document.getElementById("sliderRange");
let rangeValue = document.getElementById("rangeValue");

rangeValue.innerText = sliderRange.value;

sliderRange.oninput = function(){
    // if(sliderRange.value= 1 ){
    // rangeValue.innerText = "XS";
    // };

    // if(sliderRange.value= 2 ){
    //     rangeValue.innerText = "S";
    //     }

    // if(sliderRange.value= 3 ){
    //     rangeValue.innerText = "M";
    // }

    // if(sliderRange.value= 4 ){
    //     rangeValue.innerText = "L";
    //     }

    //     if(sliderRange.value= 5 ){
    //         rangeValue.innerText = "XL";
    //         }
    rangeValue.innerText = sliderRange.value;
}