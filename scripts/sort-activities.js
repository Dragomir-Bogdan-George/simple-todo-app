import {
  todoList,
  renderTodoList,
  saveToStorage,
} from "./process-todo-list.js";

export function sortActivities() {
  document.querySelector(".js-sort-button").addEventListener("click", () => {
    sortByName();
  });

  document.querySelector(".sort-button-date").addEventListener("click", () => {
    sortByDate();
  });
}

function sortByName() {
  let holdProperty;

  for (let iteration = 1; iteration <= todoList.length; iteration++) {
    for (let index = 0; index < todoList.length - 1; index++) {
      if (
        todoList[index].name.toLowerCase() >
        todoList[index + 1].name.toLowerCase()
      ) {
        sortLocalStorage(index);

        holdProperty = todoList[index];
        todoList[index] = todoList[index + 1];
        todoList[index + 1] = holdProperty;
      }
    }
  }

  saveToStorage();
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
        sortLocalStorage(index);

        holdProperty = todoList[index];
        todoList[index] = todoList[index + 1];
        todoList[index + 1] = holdProperty;
      }
    }
  }

  saveToStorage();
  renderTodoList();
}

function sortByDate() {
  orderNoDeadlines();
  sortDates();
}

function sortLocalStorage(index) {
  let smallItemState = localStorage.getItem(`checkbox-${index}`);
  let bigItemState = localStorage.getItem(`checkbox-${index + 1}`);
  let holdCheckboxProperty = smallItemState;

  smallItemState = bigItemState;
  bigItemState = holdCheckboxProperty;

  localStorage.setItem(`checkbox-${index}`, smallItemState);
  localStorage.setItem(`checkbox-${index + 1}`, bigItemState);
}
