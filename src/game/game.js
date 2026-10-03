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
]

export function createGame() {
  const main = document.createElement("main");
  main.className = "game";

  const board = document.createElement("div");
  board.className = "game_board";
  board.setAttribute("aria-label", "Memory game board");

  const cards = PAIRS.flatMap((pair) => [
    { ...pair },
    { ...pair },
  ]);

  const shuffledCards = shuffle(cards);

  shuffledCards.forEach((cardData) => {
    const card = createCard({
      pairId: cardData.id,
      color: cardData.color,
    });

    board.append(card);
  });

  const statistics = createStatistics();
  main.append(board, statistics.element);

  return main;
}