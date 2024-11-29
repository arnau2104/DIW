let total;
$(()=> {

    $("button").on('click' , ()=> {
        // if($.isNumeric("#number1") && $.isNumeric("#number2")) {
           let number1 = +$("#number1").val();
           let number2 = +$("#number2").val();
           total = number1 + number2;
            console.log(total);
            $("p").text(total);

           
        // };

       ;
    })
  

}); 