import {
  showGeneratedActivity,
  showLastSectionContainer,
  hideGenerateActivityContainer,
} from "./generating-activities.js";

import {
  renderTodoList,
  showSortButton,
  addActivityList,
  addGeneratedActivity,
} from "./process-todo-list.js";

import { sortActivities } from "./sort-activities.js";

showSortButton();

renderTodoList();

// function crossText(index) {
//   document.querySelector(`.name-${index}`).classList.add("cross-text");
//   document.querySelector(`.date-${index}`).classList.add("cross-text");

//   localStorage.setItem(`checkbox-${index}`, "checked");
// }

// function unCrossText(index) {
//   document.querySelector(`.name-${index}`).classList.remove("cross-text");
//   document.querySelector(`.date-${index}`).classList.remove("cross-text");

//   localStorage.setItem(`checkbox-${index}`, "unchecked");
// }

sortActivities();
showGeneratedActivity();
hideGenerateActivityContainer();
addGeneratedActivity();
showLastSectionContainer();
addActivityList();
