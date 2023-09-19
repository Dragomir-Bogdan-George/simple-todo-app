import { additionalActivity } from "./generating-activities.js";

export const todoList = JSON.parse(localStorage.getItem("todoList")) || [{}];

export function renderTodoList() {
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
  checkItem();
}

export function showSortButton() {
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

export function addGeneratedActivity() {
  document
    .querySelector(".add-to-list-button")
    .addEventListener("click", () => {
      additionalActivity.then((activity) => {
        let name = activity;
        const dateInputElement = document.querySelector(".input-date-addition");
        const dueDate =
          dateInputElement.value !== ""
            ? dateInputElement.value
            : "No deadline";

        todoList.push({
          name,
          dueDate,
        });

        showSortButton();
        renderTodoList();
        saveToStorage();
      });
    });
}

export function addActivityList() {
  document
    .querySelector(".js-add-todo-button")
    .addEventListener("click", () => {
      addTodo();
    });
}

export function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo() {
  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);

        localStorage.removeItem(`checkbox-${index}`);

        for (let i = index; i < todoList.length; i++) {
          const isChecked = localStorage.getItem(`checkbox-${i + 1}`);

          if (isChecked) {
            localStorage.setItem(`checkbox-${i}`, isChecked);
            localStorage.removeItem(`checkbox-${i + 1}`);
          }
        }

        showSortButton();
        renderTodoList();
        saveToStorage();
      });
    });
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

function checkItem() {
  document.querySelectorAll(".js-checkbox-done").forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => {
      let itemName = document.querySelector(`.name-${index}`);
      let itemDate = document.querySelector(`.date-${index}`);

      if (checkbox.checked) {
        itemName.classList.add("cross-text");
        itemDate.classList.add("cross-text");
        localStorage.setItem(`checkbox-${index}`, "checked");
      } else {
        itemName.classList.remove("cross-text");
        itemDate.classList.remove("cross-text");
        localStorage.setItem(`checkbox-${index}`, "unchecked");
      }
    });
  });
}
