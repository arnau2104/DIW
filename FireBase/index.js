import { saveTask, getTasks, onSnapshot, collection,db, deleteTasks } from "./firebase.js";

const taskFrom = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const btnDeleteTask = document.getElementById("btn-delete-task");

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

    

    onSnapshot(collection(db,"tasks"), (querySnapshot)=> {
        let html="";
        querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
        
                const task = doc.data();
        
                html+= `
                <div>
                    <h2>${task.title}</h2>
                    <p>${task.description}</h2>
                    <p>Priority: ${task.priority}</h2>
                </div>    
                `;
        })

        tasksContainer.innerHTML = html;
})

    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());

    //     const task = doc.data();

    //     html= `
    //     <div>
    //         <h2>${task.title}</h2>
    //         <p>${task.description}</h2>
    //         <p>Priority: ${task.priority}</h2>
    //     </div>    
    //     `

       
    // });
    

});

taskFrom.addEventListener("submit",(e)=> {
    e.preventDefault();
    console.log("submitted")

    const taskTitle = taskFrom["task-title"];
    const taskDescription = taskFrom["task-description"];
    const taskPriority = taskFrom["task-priority"];

     saveTask(taskTitle.value, taskDescription.value, taskPriority.value)

     taskFrom.reset()
})