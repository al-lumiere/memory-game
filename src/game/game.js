import { createCard } from "../components/card/card.js";
import { shuffle } from "./shuffle.js";

import { createStatistics } from "../components/statistics/statistics.js";

const PAIRS = [
  { id: "cobalt", color: "#223AF6" },
  { id: "cyan", color: "#6DC4CC" },
  { id: "green", color: "#4AAA46" },
  { id: "lime", color: "#8EF96C" },
  { id: "yellow", color: "#FEE119" },
  { id: "orange", color: "#F34A13" },
  { id: "pink", color: "#E1A3FA" },
  { id: "purple", color: "#DD4CFF" },
];

export function createGame() {
  let firstCard = null;
  let secondCard = null;
  let isBoardLocked = false;
  let moves = 0;
  let matchedPairs = 0;

  const main = document.createElement("main");
  main.className = "game";

  const board = document.createElement("div");
  board.className = "game_board";
  board.setAttribute("aria-label", "Memory game board");

  const cards = PAIRS.flatMap((pair) => [{ ...pair }, { ...pair }]);

  const shuffledCards = shuffle(cards);

  shuffledCards.forEach((cardData) => {
    const card = createCard({
      pairId: cardData.id,
      color: cardData.color,
      onClick: handleCardClick,
    });

    board.append(card);
  });

  const statistics = createStatistics();

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

      firstCard = null;
      secondCard = null;
      isBoardLocked = false;
      return;

      if (matchedPairs === PAIRS.length) {
        finishGame();
      }

      return;
    }

    isBoardLocked = true;

    setTimeout(() => {
      firstCard.classList.remove("card_open");
      secondCard.classList.remove("card_open");

      firstCard = null;
      secondCard = null;
      isBoardLocked = false;
    }, 900);
  }

  function finishGame() {
    console.log(`Game finished in ${moves} moves`);
  }

  main.append(board, statistics.element);
  return main;
}
