var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var buttonEl = document.querySelector("#save-task");
var pageContentEl = document.querySelector(".page-content");
var taskCounter = 0;

var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("draggable", "true");
  listItemEl.setAttribute("data-task-id", taskCounter++)
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};


buttonEl.addEventListener("click", createTaskHandler);

pageContentEl.addEventListener("dragstart", function() {
  console.log(event, "dragstart");
})
pageContentEl.addEventListener("dragover", function() {
  console.log(event, "dragover");
})
pageContentEl.addEventListener("dragleave", function() {
  console.log(event, "dragleave");
})
pageContentEl.addEventListener("drop", function() {
  console.log(event, "drop");
})