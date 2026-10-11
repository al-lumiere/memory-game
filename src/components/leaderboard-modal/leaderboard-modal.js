import { createModal } from "../modal/modal.js";
import { getResults } from "./leaderboard.js";

export function createLeaderboardModal() {
  const modal = createModal();

  modal.element.classList.add("leaderboard_modal");

  const title = document.createElement("h2");
  title.className = "leaderboard_modal_title";
  title.textContent = "leaderboard";
  title.tabIndex = -1;
  title.autofocus = true;

  const results = document.createElement("div");
  results.className = "leaderboard_modal_results";

  const closeButton = document.createElement("button");
  closeButton.className = "leaderboard_modal_button";
  closeButton.type = "button";
  closeButton.textContent = "close";

  closeButton.addEventListener("click", modal.close);
  modal.content.append(title, results, closeButton);

  function renderResults() {
    const savedResults = getResults();

    if (savedResults.length === 0) {
      const empty = document.createElement("p");
      empty.className = "leaderboard_modal_empty";
      empty.textContent = "no results yet";

      results.replaceChildren(empty);
      return;
    }

    const list = document.createElement("ol");
    list.className = "leaderboard_modal_list";

    savedResults.forEach((result, index) => {
      const item = document.createElement("li");
      item.className = "leaderboard_modal_item";

      const place = document.createElement("span");
      place.textContent = `${index + 1}.`;

      const moves = document.createElement("span");
      moves.textContent = `${result.moves} moves`;

      const date = document.createElement("span");
      date.textContent = result.date;

      item.append(place, moves, date);
      list.append(item);
    });

    results.replaceChildren(list);
  }

  function open() {
    renderResults();
    modal.open();
  }

  return {
    element: modal.element,
    open,
    close: modal.close,
  };
}
