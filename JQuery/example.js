$(()=>{
console.log("Document is ready");

$("button").text('Hola');

$("button").on("click", function(){
    $("#name").val("Arnau");
    
})

});