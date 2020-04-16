var buttonEl = document.getElementById("save-task");
var tasksToDoEl = document.getElementById("tasks-to-do");

var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "TASK!.";
  tasksToDoEl.appendChild(listItemEl);
  console.log("Hello");
};

buttonEl.addEventListener("click", createTaskHandler);
