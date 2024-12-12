const TASKSJSON = [
    {
        id: 1,
        title: "Clean dishes",
        priority: "low"
    },
    {
        id: 2,
        title: "Study JQuery",
        priority: "medium"
    }
];

$(() =>{
    let tasks = loadTasksFromLocalStoratge();
    
    if(tasks.length === 0) {
        tasks = TASKSJSON;
        saveTasksFromLocalStoratge(tasks);
    }else {
        console.log(tasks);
    }     
    
    $.each(tasks, function (index, task){
        appendTask(task);
    }); 

    $("#btn-add-task").on("click", ()=>{
        const taskTitle = $("#task-title").val();
        const taskPriorirty = $("#task-priority").val();

        if(taskTitle ) {
            let task = {
                title: taskTitle,
                priority: taskPriorirty
            }

            tasks.push(task);
            
            appendTask(task);
            saveTasksFromLocalStoratge(tasks);
            
        }else {
            $(".todo-container").append(`<h1 class="error-message"> Please, enter a task</h1>`);
            $(".error-message").css({
                color : "red"
            })
        }
    })

});

function appendTask(task) {
    $("#todo-list").append(`<li>${task.title} - ${task.priority}</li>`);
}

function loadTasksFromLocalStoratge() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
    
}
function saveTasksFromLocalStoratge(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}