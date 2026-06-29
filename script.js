const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelector(".filters");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTask();
    }
});

filters.addEventListener("click", function(e){

    if(e.target.tagName==="BUTTON"){
        currentFilter = e.target.dataset.filter;
        renderTasks();
    }

});

taskList.addEventListener("click", function(e){

    const id = Number(e.target.closest("li").dataset.id);

    if(e.target.classList.contains("delete")){

        deleteTask(id);

    }

    if(e.target.classList.contains("edit")){

        editTask(id);

    }

    if(e.target.classList.contains("toggle")){

        toggleTask(id);

    }

});

function addTask(){

    const text = taskInput.value.trim();

    if(text==="") return;

    tasks.push({
        id:Date.now(),
        text:text,
        completed:false
    });

    saveTasks();

    taskInput.value="";

    renderTasks();

}

function renderTasks(){

    taskList.innerHTML="";

    let filtered = tasks;

    if(currentFilter==="active"){
        filtered = tasks.filter(task=>!task.completed);
    }

    if(currentFilter==="completed"){
        filtered = tasks.filter(task=>task.completed);
    }

    filtered.forEach(task=>{

        const li = document.createElement("li");

        li.dataset.id = task.id;

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML=`

        <div>

            <input
                class="toggle"
                type="checkbox"
                ${task.completed?"checked":""}
            >

            <span>${task.text}</span>

        </div>

        <div>

            <button class="edit">Edit</button>

            <button class="delete">Delete</button>

        </div>

        `;

        taskList.appendChild(li);

    });

}

function deleteTask(id){

    tasks = tasks.filter(task=>task.id!==id);

    saveTasks();

    renderTasks();

}

function toggleTask(id){

    tasks = tasks.map(task=>{

        if(task.id===id){
            task.completed=!task.completed;
        }

        return task;

    });

    saveTasks();

    renderTasks();

}

function editTask(id){

    const task = tasks.find(task=>task.id===id);

    const newText = prompt("Edit Task", task.text);

    if(newText===null) return;

    task.text = newText.trim();

    saveTasks();

    renderTasks();

}

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
