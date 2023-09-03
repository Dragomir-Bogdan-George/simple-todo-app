const todoList = JSON.parse(localStorage.getItem("todoList")) || [{}];

renderTodoList();

function crossText(index) {
  document.querySelector(`.name-${index}`).classList.add("cross-text");
  document.querySelector(`.date-${index}`).classList.add("cross-text");

  localStorage.setItem(`checkbox-${index}`, "checked");
  localStorage.setItem(`cross-${index}`, "crossed");
}

function unCrossText(index) {
  document.querySelector(`.name-${index}`).classList.remove("cross-text");
  document.querySelector(`.date-${index}`).classList.remove("cross-text");

  localStorage.setItem(`checkbox-${index}`, "unchecked");
  localStorage.setItem(`cross-${index}`, "uncrossed");
}

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const isChecked = localStorage.getItem(`checkbox-${index}`);
    const isCrossed = localStorage.getItem(`cross-${index}`);
    const html = `
    <div class="name-${index} ${
      isCrossed === "crossed" ? "cross-text" : ""
    }">${name}</div>
    <div class="date-${index} ${
      isCrossed === "crossed" ? "cross-text" : ""
    }">${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">Delete</button>
    <input type="checkbox" class="checkbox-done js-checkbox-done" ${
      isChecked === "checked" ? "checked" : ""
    }>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });

  document.querySelectorAll(".js-checkbox-done").forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        crossText(index);
      } else {
        unCrossText(index);
      }
    });
  });
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");

  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate,
  });

  inputElement.value = "";

  renderTodoList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
