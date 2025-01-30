import { saveTask, getTasks, onSnapshot, collection,db, deleteTasks, saveTaskWithCustomId, generateId } from "./firebase.js";

const taskFrom = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const btnDeleteTask = document.getElementById("btn-delete-task");
let tasks = [];

btnDeleteTask.addEventListener("click", ()=> {
    const taskToDelete = document.getElementById("input-delete-task").value;

    if(taskToDelete !="") {
    deleteTasks(taskToDelete);
    document.getElementById("message").innerText = `Task ${taskToDelete} deleted...`
    }else {
         document.getElementById("message").innerText = `Task empty.`
    }
})

window.addEventListener("DOMContentLoaded", async  ()=> {
   
    console.log("loaded");

    

    onSnapshot(collection(db,"tasks"),  (querySnapshot)=> {
        let html="";
        querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        
                const task = doc.data();
                tasks.push([doc.id,task]);

                html+= `
                <div>
                    <h2>${task.title}</h2>
                    <p>${task.description}</h2>
                    <p>Priority: ${task.priority}</h2>
                </div>    
                `;

                
                //  console.log(idCount)
                
        })

        tasksContainer.innerHTML = html;
})

 

});

console.log(tasks);



  


taskFrom.addEventListener("submit",(e)=> {
    e.preventDefault();
    console.log("submitted")

    const taskTitle = taskFrom["task-title"];
    const taskDescription = taskFrom["task-description"];
    const taskPriority = taskFrom["task-priority"];
    
    let lastId = tasks.length > 0  ? tasks[tasks.length - 1][0] : 0;
    let id = +lastId + 1 
   
    
    saveTaskWithCustomId(`${id}`,taskTitle.value, taskDescription.value, taskPriority.value)

     taskFrom.reset()
})