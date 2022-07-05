//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const gradvals = [
    ['#00c9ff','#92fe9d'],
    ['#f46b45','#eea849'],
    ['#fc00ff','#00dbde'],
    ['#2c3e50','#3498db'],
    ['#004FF9','#FFF94C'],
    ['#43cea2','#185a9d'],
    ['#360033','#0b8793'],
    ['#D38312','#A83279'],
    ['#73c8a9','#373b44'],
    ['#fdfc47','#24fe41'],
    ['#fe8c00','#f83600']
]
const graddir = ['to left','to right'];

// load all event listeners
loadEventListeners();

// actual function to load all event listeners
function loadEventListeners(){
    // Load DOM content from Local Storage
    document.addEventListener('DOMContentLoaded',getTasks);

    // ADD a new task event
    form.addEventListener('submit',addTask);

    // remove task event (using event delegation)
    taskList.addEventListener('click',removeTask);

    // clear all tasks
    clearBtn.addEventListener('click',clearTasks);

    // filter tasks
    filter.addEventListener('keyup',filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = `<i class='fa fa-remove'></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
    });

}

//Add a new task
function addTask(e){


    if(taskInput.value === "") {
    alert("Task cannot be empty") ;
    return;
    }

    //create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    //create a text node to append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element (to delete a specific task)
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon to link
    link.innerHTML = `<i class='fa fa-remove'></i>`;

    //append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // Store in LocalStorage
    storeInLocalStorage(taskInput.value);

    //clearing the task input form
    taskInput.value = "";
    // change background gradient
    changeBackgroundGradient();

    e.preventDefault();
}

//change Background Gradient
function changeBackgroundGradient(){
    let len = gradvals.length;
    let grad = gradvals[Math.floor(Math.random() * len)];
    let dir = graddir[Math.floor(Math.random()*2)];
    
    document.body.style.background = `linear-gradient(${dir}, ${grad[0]}, ${grad[1]})`;
}
//remove task
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Delete task?')){
            e.target.parentElement.parentElement.remove();
        }
    }

    //remove task from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));

    });
}

//clear Tasks
function clearTasks(e){
    // we can do : 
    // taskList.innerHTML = ''; // but this is slower than --

    // faster way using while loop : https://www.measurethat.net/Benchmarks/Show/34/0/innerhtml-vs-removechild

    if(confirm('Clear All Tasks?')){
        document.body.style.background = 'white';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }  
    }

    // clear from local storage
    localStorage.clear();


    e.preventDefault();
}

// filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase(); // to match correctly
    changeBackgroundGradient();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}

//Store in Local Storage
function storeInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}