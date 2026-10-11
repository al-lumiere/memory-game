import { createCard } from "../components/card/card.js";
import { createStatistics } from "../components/statistics/statistics.js";
import { createVictoryModal } from "../components/victory-modal/victory-modal.js";
import { saveResult } from "../components/leaderboard-modal/leaderboard.js";

import { shuffle } from "./shuffle.js";

const PAIRS = [
  { id: "cobalt", color: "var(--cobalt)" },
  { id: "cyan", color: "var(--cyan)" },
  { id: "green", color: "var(--green)" },
  { id: "lime", color: "var(--lime)" },
  { id: "yellow", color: "var(--yellow)" },
  { id: "orange", color: "var(--orange)" },
  { id: "pink", color: "var(--pink)" },
  { id: "purple", color: "var(--purple)" },
];

export function createGame() {
  let firstCard = null;
  let secondCard = null;
  let isBoardLocked = false;
  let moves = 0;
  let matchedPairs = 0;
  let mismatchTimer = null;

  const main = document.createElement("main");
  main.className = "game";

  const stage = document.createElement("div");
  stage.className = "game_stage";

  const background = document.createElement("div");
  background.className = "game_background";
  background.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 4; i += 1) {
    const circle = document.createElement("span");
    circle.className = "game_background-circle";
    background.append(circle);
  }

  const board = document.createElement("div");
  board.className = "game_board";
  board.setAttribute("aria-label", "Memory game board");

  const statistics = createStatistics();

  const victoryModal = createVictoryModal({
    onNewGame: newGame,
  });

  function renderCards() {
    const cards = PAIRS.flatMap((pair) => [{ ...pair }, { ...pair }]);

    const shuffledCards = shuffle(cards);

    const cardElements = shuffledCards.map((cardData) =>
      createCard({
        pairId: cardData.id,
        color: cardData.color,
        onClick: handleCardClick,
      }),
    );

    board.replaceChildren(...cardElements);
  }

  function handleCardClick(card) {
    if (
      isBoardLocked ||
      card === firstCard ||
      card.classList.contains("card_matched")
    ) {
      return;
    }

    card.classList.add("card_open");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    moves += 1;
    statistics.setMoves(moves);

    checkMatch();
  }

  function checkMatch() {
    const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

    if (isMatch) {
      firstCard.classList.add("card_matched");
      secondCard.classList.add("card_matched");

      matchedPairs += 1;
      statistics.setPairs(matchedPairs);

      document.documentElement.style.setProperty(
        "--background-circle",
        firstCard.dataset.color,
      );

      firstCard = null;
      secondCard = null;
      isBoardLocked = false;

      if (matchedPairs === PAIRS.length) {
        finishGame();
      }

      return;
    }

    isBoardLocked = true;

    mismatchTimer = setTimeout(() => {
      firstCard.classList.remove("card_open");
      secondCard.classList.remove("card_open");

      firstCard = null;
      secondCard = null;
      isBoardLocked = false;
      mismatchTimer = null;
    }, 900);
  }

  function finishGame() {
    saveResult(moves);
    victoryModal.open(moves);
  }

  function newGame() {
    if (mismatchTimer !== null) {
      clearTimeout(mismatchTimer);
      mismatchTimer = null;
    }

    firstCard = null;
    secondCard = null;
    isBoardLocked = false;
    moves = 0;
    matchedPairs = 0;

    statistics.setMoves(0);
    statistics.setPairs(0);

    document.documentElement.style.removeProperty("--background-circle");

    renderCards();
  }

  renderCards();
  stage.append(background, board, statistics.element);
  main.append(stage, victoryModal.element);

  return {
    element: main,
    newGame,
  };
}
