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

sortActivities();

showGeneratedActivity();

hideGenerateActivityContainer();

addGeneratedActivity();

showLastSectionContainer();

addActivityList();
