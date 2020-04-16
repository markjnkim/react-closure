var taskIdCounter = 0;

var formEl = document.getElementById("task-form");
var tasksToDoEl = document.getElementById("tasks-to-do");
var tasksInProgressEl = document.getElementById("tasks-in-progress");
var tasksCompletedEl = document.getElementById("tasks-completed");
var pageContentEl = document.getElementById("page-content");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskTitleInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (!taskTitleInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskTitleInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      title: taskTitleInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  listItemEl.setAttribute("draggable", "true");

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-title'>" + taskDataObj.title + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function(taskTitle, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-title").textContent = taskTitle;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    editTask(targetEl.dataset.taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    deleteTask(targetEl.dataset.taskId);
  }
};

var taskStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.dataset.taskId;

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

var editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task title and type
  var taskTitle = taskSelected.querySelector("h3.task-title").textContent;
  console.log(taskTitle);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskTitle and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskTitle;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

var dropTaskHandler = function(event) {
  event.preventDefault();
  // console.log("this works");
  if (!event.target.matches(".page-content")) {
    var id = event.dataTransfer.getData("text/plain");
    console.log(id);
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropzone = event.target.closest(".task-list");
    dropzone.removeAttribute("style");

    // set status of task based on dropzone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    var statusType = dropzone.id;

    switch (statusType) {
      case "tasks-to-do":
        statusSelectEl.selectedIndex = 0;
        break;
      case "tasks-in-progress":
        statusSelectEl.selectedIndex = 1;
        break;
      case "tasks-completed":
        statusSelectEl.selectedIndex = 2;
        break;
      default:
        console.log("Something went wrong!");
    }

    dropzone.appendChild(draggableElement);

  }
};

// var dropTaskHandler = function(event) {
//   var id = event.dataTransfer.getData("text/plain");
//   var draggableElement = document.querySelector("[data-task-id='" + id + "']");
//   var dropZoneEl = event.target.closest(".task-list");
//   var statusType = dropZoneEl.id;
//   // console.log(statusType);
//   // console.dir(dropZoneEl);
//   var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
//   console.dir(statusSelectEl);
//   console.log(statusSelectEl);

// };

// defines the drop zone

// var dragTaskHandler = function(event) {
//   if (event.target.matches("li.task-item")) {
//     event.dataTransfer.setData("text/plain", event.target.dataset.taskId);
//   }
// };

// var dragTaskHandler = function(event) {
//   console.log("event.target:", event.target); 
//   console.log("event.type:", event.type);
//   console.log("event", event);
// } 
var dragTaskHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text", taskId);
  
//   var dataId = event.dataTransfer.getData("text");
//   console.log("getId:", dataId, typeof dataId);
// }
}
var dropzoneDragHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
  }
};


// var dropZoneDragHandler = function(event) {
//   console.log("Dragover Event Target:", event.target);
// };
// var dragLeaveHandler = function(event) {
//   // var dropZoneEl = event.target.closest(".task-list") 
//   // if (dropZoneEl) dropZoneEl.removeAttribute("style");
// };
var dragLeaveHandler = function(event) {
  console.dir(event.target);
}
// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// for dragging
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropzoneDragHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
