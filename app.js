// DOM Elements
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedButton = document.getElementById("clear-completed");
const taskDateInput = document.getElementById("task-date");
const viewDateInput = document.getElementById("view-date");
const tasksByDateList = document.getElementById("tasks-by-date");
const viewTasksButton = document.getElementById("view-tasks");

// Task Storage
let tasks = []; // { text: string, date: string, completed: boolean }

// Add Task
document.getElementById("add-task").addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = taskDateInput.value;

  if (taskText && taskDate) {
    tasks.push({ text: taskText, date: taskDate, completed: false });
    renderTasks();
    taskInput.value = ""; // Clear input
    taskDateInput.value = ""; // Clear date
  } else {
    alert("Please enter a task and select a date.");
  }
});

// Delete Task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const taskIndex = e.target.dataset.index;
    tasks.splice(taskIndex, 1); // Remove task by index
    renderTasks();
  }
});

// Mark Task as Complete/Incomplete
taskList.addEventListener("change", (e) => {
  if (e.target.classList.contains("task-checkbox")) {
    const taskIndex = e.target.dataset.index;
    tasks[taskIndex].completed = e.target.checked; // Update completion status
    renderTasks();
  }
});

// Filter Tasks
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.id.replace("filter-", "");
    filterTasks(filter);
  });
});

function filterTasks(filter) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  renderTasks(filteredTasks);
}

// Render Tasks
function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? "checked" : ""} />
      <span>${task.text} (${task.date})</span>
      <button class="delete-task" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Clear Completed Tasks
clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

// View Tasks by Date
viewTasksButton.addEventListener("click", () => {
  const selectedDate = viewDateInput.value;
  if (!selectedDate) {
    alert("Please select a date.");
    return;
  }

  const tasksForDate = tasks.filter((task) => task.date === selectedDate);
  tasksByDateList.innerHTML = "";

  if (tasksForDate.length === 0) {
    tasksByDateList.innerHTML = "<li>No tasks for the selected date.</li>";
  } else {
    tasksForDate.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (${task.completed ? "Completed" : "Active"})`;
      tasksByDateList.appendChild(li);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const addTaskButton = document.getElementById("add-task");
  const taskInput = document.getElementById("new-task");
  const taskCategory = document.getElementById("task-category");

  // Add a task with category
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${getCategoryIcon(category)} ${taskText}</span>
      <button class="delete-task">Delete</button>
    `;
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // Delete task event
    li.querySelector(".delete-task").addEventListener("click", () => {
      li.remove();
    });
  });

  // Get category icon
  function getCategoryIcon(category) {
    const icons = {
      shopping: "🛒",
      personal: "👤",
      learning: "📘",
      work: "💼",
      other: "🔖",
    };
    return icons[category] || "❓";
  }
});