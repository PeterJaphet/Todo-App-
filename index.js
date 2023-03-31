//Hamburger

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar ul");
const navBar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  navBar.classList.toggle("active");
});

document.querySelectorAll(".navbar li").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navBar.classList.remove("active");
  })
);

//Modal
var modal = document.getElementById("mod1");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.onload = loadTasks;

const task = document.querySelector(".input1");
const tasksCont = document.querySelector(".task");
const tasksCompleted = document.querySelector(".completedTask");
const tasksUpcoming = document.querySelector(".upcomingTask");
const add = document.querySelector("#add");

add.addEventListener("click", () => {
  addTask(task.value);
});



function TaskUp() {
    tasksUpcoming.innerHTML = "";
    if (localStorage.getItem("tasks") == null) return;
    let taskItems = Array.from(JSON.parse(localStorage.getItem("tasks")));
    taskItems.forEach((task, id) => {
      if (task.completed !== true) {
        const li = document.createElement("li");
        li.setAttribute("class", "tasks");
        li.innerHTML = `
        <p class="${
          task.completed ? "completed" : ""
        }"  onfocus="getCurrentTask(this)">${task.task}</p>
        <span class="check" onclick="removeTask(${id})"><i class="fa-solid fa-trash"></i></i></span>`;
        tasksUpcoming.insertBefore(li, tasksUpcoming.children[0]);
      }
    });
  }

function TaskComp() {
  tasksCompleted.innerHTML = "";
  if (localStorage.getItem("tasks") == null) return;
  let taskItems = Array.from(JSON.parse(localStorage.getItem("tasks")));
  taskItems.forEach((task, id) => {
    if (task.completed === true) {
      const li = document.createElement("li");
      li.setAttribute("class", "tasks");
      li.innerHTML = `
      <p  onfocus="getCurrentTask(this)">${task.task}</p>
      <span class="check" onclick="removeTask(${id})"><i class="fa-solid fa-trash"></i></i></span>`;
      tasksCompleted.insertBefore(li, tasksCompleted.children[0]);
    }
  });
}

function loadTasks() {
  TaskComp();
  //TaskUp();
  tasksCont.innerHTML = "";
  if (localStorage.getItem("tasks") == null) return;
  let taskItems = Array.from(JSON.parse(localStorage.getItem("tasks")));
  console.log(taskItems);
  taskItems.forEach((task, id) => {
    if (task.completed !== true) {
    const li = document.createElement("li");
    li.setAttribute("class", "tasks");
    li.innerHTML = `
      <input type="checkbox" onclick="taskComplete(this)" id=${id} class="time " onfocus="getCurrentTask(this)" ${
      task.completed ? "checked" : ""
    }>
      <p class="${
        task.completed ? "completed" : ""
      }"  onfocus="getCurrentTask(this)">${task.task}</p>
      <span class="check" onclick="removeTask(${id})"><i class="fa-solid fa-trash"></i></i></span>`;
    tasksCont.insertBefore(li, tasksCont.children[-1]);
}});
}

function addTask(item) {
  if (item !== "") {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        { task: item, completed: false },
      ])
    );
    task.value = "";
    loadTasks();
  }
}

function taskComplete(event) {
  let taskItems = Array.from(JSON.parse(localStorage.getItem("tasks")));
  taskItems.forEach((task, id) => {
    if (id == event.id) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(taskItems));
  event.nextElementSibling.classList.toggle("completed");
  loadTasks();
}

function removeTask(did) {
  const modal = document.getElementById("mod1");
  modal.style.display = "block";
  const del = document.getElementById("del");
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  del.addEventListener("click", () => {
    console.log(tasks);
    console.log(did);
    tasks.splice(did, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //event.parentElement.remove();
    loadTasks();
    modal.style.display = "none";
  });
}

var currentTask = null;

function getCurrentTask(event) {
  currentTask = event.value;
}
