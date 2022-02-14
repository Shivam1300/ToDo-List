const dialogbox = document.getElementById("dialog");
const addBtn = document.getElementById("addBtn");
const closebtn = document.getElementById("closebtn");
const  todo_content = document.getElementById("todocontent");
const error = document.querySelector(".error");


const title = document.getElementById("title");
const todotext = document.getElementById("todotext");

let counter = 0;

let data = JSON.parse(localStorage.getItem("todos")) || [];
counter = data.length;

for(let i=0; i<data.length; i++){
        let todo__text = `<div class="todo-list" todo-id='${i}'>
        <div class="todo-header">${data[i].title}
            <button>X</button>
        </div>
        <div class="todo-text">${data[i].text}</div>
    </div>`;
    todo_content.innerHTML = todo_content.innerHTML + todo__text;
}

deletelisteners()

addBtn.addEventListener("click", function() {
    dialogbox.style.display = "flex";
});

closebtn.addEventListener("click", function() {
    dialogbox.style.display = "none";
    error.classList.add("erase");
});

function addTodo() {
    if(todotext.value !== "" && title.value !== "") {
        let todo__text = `<div class="todo-list">
        <div class="todo-header">${title.value}
        <button>X</button>
        </div>
        <div class = "todo-text">${todotext.value}</div>
    </div>`;
    todo_content.innerHTML = todo_content.innerHTML + todo__text;
    deletelisteners();
    
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    
    todos.push({
        id : counter,
        title : title.value,
        text : todotext.value
    });
    counter += 1

    localStorage.setItem("todos", JSON.stringify(todos));

    todotext.value="";
    title.value="";
    dialogbox.style.display="none";
    } else {
        error.classList.remove("erase");
    }
    
}

function deletelisteners() {
    const delarr = document.querySelectorAll(".todo-header button");
    for (let i = 0; i < delarr.length; i++) {
        delarr[i].addEventListener("click", function (e) {
            let todo = e.target.closest(".todo-list");
            console.log(todo);
            let id = todo.getAttribute("todo-id");
            console.log(id);
            let data = JSON.parse(localStorage.getItem("todos"));
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id != id) {
                    newData.push(data[i]);
                }
            }
            console.log(newData);
            localStorage.setItem("todos", JSON.stringify(newData));
            todo.classList.add("erase");
        });
    }
}