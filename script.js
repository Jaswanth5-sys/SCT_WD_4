let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskTime = document.getElementById("taskTime");

    if(taskInput.value === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        completed:false
    });

    saveTasks();

    taskInput.value="";
    taskDate.value="";
    taskTime.value="";
}

function displayTasks(){

    let taskList = document.getElementById("taskList");
    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
                <br>
                ${task.date} ${task.time}
            </span>

            <div class="actions">
                <button onclick="completeTask(${index})">✔</button>

                <button onclick="editTask(${index})">✏</button>

                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function completeTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function editTask(index){

    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask){
        tasks[index].text = newTask;
        saveTasks();
    }
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}