let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}




function addTask(){


let input =
document.getElementById("taskInput");


let text =
input.value.trim();



if(text===""){

alert("Please enter a task ✨");

return;

}



tasks.push({

id:Date.now(),

text:text,

completed:false,

created:new Date().toLocaleString(),

completedTime:""

});



input.value="";


saveTasks();

displayTasks();


}




function displayTasks(){


let pending =
document.getElementById("pendingList");


let completed =
document.getElementById("completedList");


pending.innerHTML="";
completed.innerHTML="";



let pendingTasks =
tasks.filter(
task=>!task.completed
);



let completedTasks =
tasks.filter(
task=>task.completed
);



pendingTasks.forEach(task=>{

pending.innerHTML += createTask(task);

});



completedTasks.forEach(task=>{

completed.innerHTML += createTask(task);

});



document.getElementById("pendingCount")
.innerText =
pendingTasks.length+" pending";


document.getElementById("completedCount")
.innerText =
completedTasks.length+" completed";



document.getElementById("pendingEmpty")
.style.display =
pendingTasks.length ? "none":"block";


document.getElementById("completedEmpty")
.style.display =
completedTasks.length ? "none":"block";



}





function createTask(task){


return `

<li class="task">


<div class="task-text">

<strong>${task.text}</strong>

<br>

<span class="time">

Added: ${task.created}

</span>


</div>


<div class="actions">


<button class="complete"
onclick="completeTask(${task.id})">

${task.completed?"Undo":"Done"}

</button>


<button class="edit"
onclick="editTask(${task.id})">

Edit

</button>



<button class="delete"
onclick="deleteTask(${task.id})">

Delete

</button>


</div>


</li>

`;

}





function completeTask(id){


tasks =
tasks.map(task=>{


if(task.id===id){


task.completed =
!task.completed;


task.completedTime =
task.completed
?
new Date().toLocaleString()
:
"";


}


return task;


});



saveTasks();

displayTasks();


}




function editTask(id){


let task =
tasks.find(
task=>task.id===id
);



let newText =
prompt(
"Edit your task:",
task.text
);



if(newText){

task.text=newText;


saveTasks();

displayTasks();

}


}





function deleteTask(id){


tasks =
tasks.filter(
task=>task.id!==id
);



saveTasks();

displayTasks();


}





displayTasks();
