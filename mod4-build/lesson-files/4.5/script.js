var taskIdCounter = 0;

var formEl = document.getElementById("task-form");
var tasksToDoEl = document.getElementById("tasks-to-do");
var tasksInProgressEl = document.getElementById("tasks-in-progress");
var tasksCompletedEl = document.getElementById("tasks-completed");
var pageContentEl = document.getElementById("page-content");

// create array to hold tasks for saving
var tasks = [];

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
    createTask(taskTitleInput, taskTypeInput);
  }
};

var createTask = function(taskTitle, taskType) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  listItemEl.setAttribute("draggable", "true");

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-title'>" + taskTitle + "</h3><span class='task-type'>" + taskType + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // create buttons for task
  var taskButtonsEl = createTaskButtons(taskIdCounter);
  listItemEl.appendChild(taskButtonsEl);

  tasksToDoEl.appendChild(listItemEl);

  // save task as an object with title, type, status, and id properties then push it into tasks array
  var taskObject = {
    id: taskIdCounter,
    title: taskTitle,
    type: taskType,
    // set a default status
    status: "to do"
  };

  tasks.push(taskObject);

  // save tasks to localStorage
  saveTasks();

  // increase task counter for next unique task id
  taskIdCounter++;
};

var createTaskButtons = function(taskId) {
  // create container to hold three buttons
  var buttonContainerEl = document.createElement("div");
  buttonContainerEl.className = "task-buttons";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  buttonContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  buttonContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  buttonContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Done"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return buttonContainerEl;
};

var completeEditTask = function(taskTitle, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-title").textContent = taskTitle;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // find task in tasks array and update values
  tasks.forEach(function(task) {
    if (task.id === parseInt(taskId)) {
      task.title = taskTitle;
      task.type = taskType;
    }
  });

  alert("Task Updated!");

  // save tasks to localStorage
  saveTasks();

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
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
  } else if (statusValue === "done") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in tasks array then save to localStorage for persistence
  tasks.forEach(function(task) {
    if (parseInt(taskId) === task.id) {
      task.status = statusValue;
    }
  });

  saveTasks();
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
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // remove task from tasks array using a filter
  tasks = tasks.filter(function(task) {
    if (parseInt(taskId) !== task.id) {
      return true;
    }
  });

  saveTasks();

  alert("Task deleted!");
};

var dropTaskHandler = function(event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropzone = event.target.closest(".task-list");

  // set status of task based on dropzone id
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
  var statusType = dropzone.id;

  // create variable to hold status
  var newStatus;

  // update status of element both on page
  if (statusType === "tasks-to-do") {
    statusSelectEl.selectedIndex = 0;
    newStatus = "to do";
  } else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
    newStatus = "in progress";
  } else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
    newStatus = "complete";
  }

  // update tasks array with task's updated status
  tasks.forEach(function(task) {
    if (parseInt(id) === task.id) {
      task.status = newStatus;
    }
  });

  // saveTasks
  saveTasks();

  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
};

// stops page from loading the dropped item as a resource (opening a new link)
var dropzoneDragHandler = function(event) {
  event.preventDefault();
};

var dragTaskHandler = function(event) {
  if (event.target.matches("li.task-item")) {
    console.log(event.target.dataset.taskId);
    event.dataTransfer.setData("text/plain", event.target.dataset.taskId);
  }
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("tasks saved");
};

var loadTasks = function() {
  tasks = localStorage.getItem("tasks");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!tasks) {
    tasks = [];
    return false;
  }

  console.log("Saved tasks found!");

  // else, load up saved tasks

  // parse into array of objects
  tasks = JSON.parse(tasks);

  // identify what id to start at based on highest number in list
  var mostRecentTask = tasks.reduce(function(prevTask, currentTask) {
    if (prevTask.id > currentTask.id) {
      return prevTask;
    } else {
      return currentTask;
    }
  });

  // set taskIdCounter to one greater than id we just grabbed
  taskIdCounter = parseInt(mostRecentTask.id) + 1;

  // loop through tasks and print them to corresponding list based on their status
  for (var i = 0; i < tasks.length; i++) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", tasks[i].id);
    listItemEl.setAttribute("draggable", "true");

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML =
      "<h3 class='task-title'>" + tasks[i].title + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create buttons for task
    var taskButtonsEl = createTaskButtons(tasks[i].id);
    listItemEl.appendChild(taskButtonsEl);

    // set task's select dropdown based on status and place into correct list
    if (tasks[i].status === "to do") {
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.appendChild(listItemEl);
    } else if (tasks[i].status === "in progress") {
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.appendChild(listItemEl);
    } else if (tasks[i].status === "complete") {
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.appendChild(listItemEl);
    }
  }
};

// create an interval to autosave tasks
setInterval(saveTasks, 60000);

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// for dragging
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropzoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);

loadTasks();
