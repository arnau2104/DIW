import { saveTask,saveTaskWithId,deletTask,editTask } from "./firebase.js";
$(()=> {
    console.log("hola")
  


    $(document).on('click', '#save', function (e) {
        const taskName = $("#taskName").val();
        const taskDescription = $("#description").val();
        console.log("dins event")
        console.log(taskName , taskDescription)
        e.preventDefault()

        if(taskName === "" || taskDescription === ""){
            console.log("Empty men")
        }else{
            console.log("date not empty")

            saveTaskWithId("1",taskName,taskDescription);
        }
        
    })

    $(document).on("click", "#delete", (e)=> {
        e.preventDefault();

        deletTask("LdmhLgsak1x4OOAxxYdu");
        console.log("deleted")
    })

    $("#edit").on('click',(e)=> {
        e.preventDefault();
        const taskName = $("#taskName").val();
        const taskDescription = $("#description").val();
       
             editTask("1",{taskDescription:`${taskDescription}`, taskName: `${taskName}`})
        
        
    })
    
})
