export let additionalActivity;

export async function getActivity() {
  const response = await fetch("https://www.boredapi.com/api/activity/");
  const data = await response.json();
  const { activity } = data;

  return activity;
}

export function showGeneratedActivity() {
  document
    .querySelector(".generate-activity-button")
    .addEventListener("click", () => {
      additionalActivity = getActivity();

      additionalActivity
        .then((activity) => {
          document.querySelector(".label").classList.add("label-state");
          document.querySelector(".label").innerHTML = activity;

          document
            .querySelector(".add-text-list")
            .classList.add("add-text-list-state");
          document
            .querySelector(".yes-button")
            .classList.add("yes-button-state");
          document.querySelector(".no-button").classList.add("no-button-state");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });
}

function showLastTextContainer() {
  document
    .querySelector(".date-of-activity")
    .classList.add("date-of-activity-state");
}

function showLastElementsContainer() {
  document
    .querySelector(".input-date-addition")
    .classList.add("input-date-addition-state");

  document
    .querySelector(".add-to-list-button")
    .classList.add("add-to-list-button-state");
}

export function showLastSectionContainer() {
  document.querySelector(".yes-button").addEventListener("click", () => {
    showLastTextContainer();
    showLastElementsContainer();
  });
}

function removeLabel() {
  document.querySelector(".label").classList.remove("label-state");
  document
    .querySelector(".add-text-list")
    .classList.remove("add-text-list-state");
}

function removeChoiceButtons() {
  document.querySelector(".yes-button").classList.remove("yes-button-state");
  document.querySelector(".no-button").classList.remove("no-button-state");
}

function removeChoiceUser() {
  document
    .querySelector(".date-of-activity")
    .classList.remove("date-of-activity-state");
  document
    .querySelector(".input-date-addition")
    .classList.remove("input-date-addition-state");
  document
    .querySelector(".add-to-list-button")
    .classList.remove("add-to-list-button-state");
}

export function hideGenerateActivityContainer() {
  document.querySelector(".no-button").addEventListener("click", () => {
    removeLabel();
    removeChoiceButtons();
    removeChoiceUser();
  });
}
