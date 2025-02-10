$(()=>{
    $.getJSON("datos.json", (data)=> {
        $.each(data ,(index,persona)=> {
            console.log("Nombre: ", persona.nombre);

        })
    })
})