export function createStatistics() {
  const statistics = document.createElement("div");
  statistics.className = "statistics";

  const moves = document.createElement("p");
  moves.className = "statistics_item";

  const movesLabel = document.createElement("span");
  movesLabel.textContent = "Moves";

  const movesValue = document.createElement("span");
  movesValue.textContent = "0";

  moves.append(movesLabel, movesValue);

  const pairs = document.createElement("p");
  pairs.className = "statistics_item";

  const pairsLabel = document.createElement("span");
  pairsLabel.textContent = "Pairs";

  const pairsValue = document.createElement("span");
  pairsValue.textContent = "0/8";

  pairs.append(pairsLabel, pairsValue);
  statistics.append(moves, pairs);

  return {
    element: statistics,

    setMoves(value) {
      movesValue.textContent = String(value);
    },

    setPairs(value) {
      pairsValue.textContent = `${value}/8`;
    },
  };
}