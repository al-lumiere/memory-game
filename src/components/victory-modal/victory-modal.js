import { createModal } from "../modal/modal.js";

export function createVictoryModal ({ onNewGame }) {
  const modal = createModal();

  modal.element.classList.add("victory_modal");

  const title = document.createElement("h2");
  title.className = "victory_modal_title";
  title.textContent = "You won!";

  const message = document.createElement("p");
  message.className = "victory_modal_message";

  const actions = document.createElement("div");
  actions.className = "victory_modal_actions";

  const newGameButton = document.createElement("button");
  newGameButton.className = "victory_modal_button";
  newGameButton.type = "button";
  newGameButton.textContent = "new game";

  const closeButton = document.createElement("button");
  closeButton.className = "victory_modal_button";
  closeButton.type = "button";
  closeButton.textContent = "close";

  newGameButton.addEventListener("click", () => {
    modal.close();
    onNewGame();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  actions.append(newGameButton, closeButton);
  modal.content.append(title, message, actions);

  function open(moves) {
    message.textContent = `You found all pairs in ${moves} moves.`;
    modal.open();
  }

  return {
    element: modal.element,
    open,
    close: modal.close,
  };
}