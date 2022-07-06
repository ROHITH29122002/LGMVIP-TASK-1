let addbtn = document.getElementById("addbtn");
var jsontasks = localStorage.getItem("tasks");
let tasks;
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/x|y/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
function createtask(element) {
    const taskcontainer = document.createElement("div");
    taskcontainer.id=element.id;
    taskcontainer.classList.add("taskcontainer");
    document.getElementById("tasks-container").appendChild(taskcontainer);
    const task = document.createElement("h3");
    task.id = element.id;
    task.classList.add("taskname");
    task.onclick=()=>{
            task.style.textDecoration = "line-through";
            let id = task.id;
            tasks.forEach(task => {
                if(task.id == id){
                    task.flag = true;
                }
            })
            localStorage.setItem("tasks",JSON.stringify(tasks));
            location.reload();
    }
    task.innerHTML = `${element.name}`;
    if(element.flag){
        task.style.textDecoration="line-through";
    }
    taskcontainer.appendChild(task);
    const close = document.createElement("button");
    close.id = element.id;
    close.innerHTML = '&#x2715;';
    close.classList.add("closebtn");
    close.onclick = () => {
        let id = close.id;
        let filteredtasks = tasks.filter((element)=>{
            return element.id != id;
        })
        localStorage.setItem("tasks",JSON.stringify(filteredtasks));
        document.getElementById(`${id}`).remove();
        location.reload();
    }
    taskcontainer.appendChild(close);
}
if(jsontasks != null){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(element => {
        createtask(element);
    });
}
else{
    tasks = [];
}
addbtn.onclick = () => {
    var taskname = document.getElementById("task-input").value;
    document.getElementById("task-input").value = "";
    var taskobj = {
        id: create_UUID(),
        name: taskname,
        flag : false,
    }
    tasks.push(taskobj)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createtask(taskobj);
    location.reload();
}

