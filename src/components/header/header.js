export function createHeader({ onNewGame, onOpenLeaderboard }) {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.className = "header_title";
  title.textContent = "Memory Game";

  const actions = document.createElement("div");
  actions.className = "header_actions";

  const newGameButton = document.createElement("button");
  newGameButton.className = "header_button";
  newGameButton.textContent = "New Game";
  newGameButton.type = "button";

  const leaderboardButton = document.createElement("button");
  leaderboardButton.className = "header_button";
  leaderboardButton.textContent = "Leaderboard";
  leaderboardButton.type = "button";

  newGameButton.addEventListener("click", onNewGame);
  leaderboardButton.addEventListener("click", onOpenLeaderboard);

  actions.append(newGameButton, leaderboardButton);
  header.append(title, actions);

  return header;
}