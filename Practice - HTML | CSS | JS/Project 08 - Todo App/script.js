// dom elements
const taskIn = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateEl = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let filter = "all";

// event listeners
addBtn.onclick = () => addTodo(taskIn.value);
taskIn.onkeydown = (e) => { if (e.key === "Enter") addTodo(taskIn.value); };
clearBtn.onclick = () => { todos = todos.filter(t => !t.completed); save(); render(); };

// add todo
const addTodo = (text) => {
  if (!text.trim()) return;
  todos.push({ id: Date.now(), text, completed: false });
  save();
  render();
  taskIn.value = "";
};

// save and update ui
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  const active = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${active} item${active !== 1 ? "s" : ""} left`;
  const filtered = getFilt();
  emptyState.classList.toggle("hidden", filtered.length > 0);
};

// filter todos
const getFilt = () => filter === "active" ? todos.filter(t => !t.completed) : filter === "completed" ? todos.filter(t => t.completed) : todos;

// render todos
const render = () => {
  todosList.innerHTML = "";
  getFilt().forEach(todo => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;
    li.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
        <span class="checkmark"></span>
      </label>
      <span class="todo-item-text">${todo.text}</span>
      <button class="delete-btn"><i class="fas fa-times"></i></button>
    `;
    li.querySelector(".todo-checkbox").onchange = () => toggle(todo.id);
    li.querySelector(".delete-btn").onclick = () => del(todo.id);
    todosList.appendChild(li);
  });
};

// toggle todo
const toggle = (id) => {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  save();
  render();
};

// delete todo
const del = (id) => {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
};

// set filter
filters.forEach(f => f.onclick = () => {
  filter = f.dataset.filter;
  filters.forEach(i => i.classList.toggle("active", i.dataset.filter === filter));
  render();
});

// set date
const setDate = () => {
  const opts = { weekday: "long", month: "short", day: "numeric" };
  dateEl.textContent = new Date().toLocaleDateString("en-US", opts);
};

// init
window.onload = () => {
  const stored = localStorage.getItem("todos");
  if (stored) todos = JSON.parse(stored);
  render();
  save();
  setDate();
};
