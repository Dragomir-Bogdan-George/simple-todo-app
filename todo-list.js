const todoList = JSON.parse(localStorage.getItem("todoList")) || [{}];

showSortButton();

renderTodoList();

function showSortButton() {
  if (todoList.length > 0) {
    document.querySelector(".sort-button").classList.add("sort-state");
    document
      .querySelector(".sort-button-date")
      .classList.add("sort-state-date");
  } else {
    document.querySelector(".sort-button").classList.remove("sort-state");
    document
      .querySelector(".sort-button-date")
      .classList.remove("sort-state-date");
  }
}

function crossText(index) {
  document.querySelector(`.name-${index}`).classList.add("cross-text");
  document.querySelector(`.date-${index}`).classList.add("cross-text");

  localStorage.setItem(`checkbox-${index}`, "checked");
}

function unCrossText(index) {
  document.querySelector(`.name-${index}`).classList.remove("cross-text");
  document.querySelector(`.date-${index}`).classList.remove("cross-text");

  localStorage.setItem(`checkbox-${index}`, "unchecked");
}

function deleteTodo() {
  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        localStorage.removeItem(`checkbox-${index}`);
        showSortButton();
        renderTodoList();
        saveToStorage();
      });
    });
}

function sortByName() {
  let holdProperty;

  for (let iteration = 1; iteration <= todoList.length; iteration++) {
    for (let index = 0; index < todoList.length - 1; index++) {
      if (todoList[index].name > todoList[index + 1].name) {
        holdProperty = todoList[index];
        todoList[index] = todoList[index + 1];
        todoList[index + 1] = holdProperty;
      }
    }
  }
  renderTodoList();
}

function orderNoDeadlines() {
  for (let index = 0; index < todoList.length; index++) {
    if (todoList[index].dueDate === "No deadline") {
      todoList.push({
        name: todoList[index].name,
        dueDate: todoList[index].dueDate,
      });
      todoList.splice(index, 1);
    }
  }
  renderTodoList();
}

function sortDates() {
  let holdProperty;

  for (let iteration = 1; iteration <= todoList.length; iteration++) {
    for (let index = 0; index < todoList.length - 1; index++) {
      if (todoList[index].dueDate > todoList[index + 1].dueDate) {
        holdProperty = todoList[index];
        todoList[index] = todoList[index + 1];
        todoList[index + 1] = holdProperty;
      }
    }
  }
  renderTodoList();
}

function sortByDate() {
  orderNoDeadlines();
  sortDates();
}

function crossRow() {
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

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const isChecked = localStorage.getItem(`checkbox-${index}`);

    const html = `
    <div class="name-${index} ${
      isChecked === "checked" ? "cross-text" : ""
    }">${name}</div>
    <div class="date-${index} ${
      isChecked === "checked" ? "cross-text" : ""
    }">${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">Delete</button>
    <input type="checkbox" class="checkbox-done js-checkbox-done" ${
      isChecked === "checked" ? "checked" : ""
    }>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  deleteTodo();
  crossRow();
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");

  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate =
    dateInputElement.value !== "" ? dateInputElement.value : "No deadline";

  if (name !== "") {
    todoList.push({
      name,
      dueDate,
    });

    showSortButton();

    inputElement.value = "";

    renderTodoList();
    saveToStorage();
  } else {
    alert("Please give a name for the activity!");
  }
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

document.querySelector(".js-sort-button").addEventListener("click", () => {
  sortByName();
});

document.querySelector(".sort-button-date").addEventListener("click", () => {
  sortByDate();
});
