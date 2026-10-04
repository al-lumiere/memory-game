import { createHeader } from "./components/header/header.js";
import { createFooter } from "./components/footer/footer.js";
import { createGame } from "./game/game.js";
import { createLeaderboardModal } from "./components/leaderboard-modal/leaderboard-modal.js";

const GITHUB_URL = "https://github.com/al-lumiere";

const app = document.createElement("div");
app.className = "app";

const game = createGame();
const leaderboardModal = createLeaderboardModal();

const header = createHeader({
  onNewGame: game.newGame,
  onOpenLeaderboard: leaderboardModal.open,
});

const footer = createFooter(GITHUB_URL);

app.append(header, game.element, footer, leaderboardModal.element);
document.body.append(app);
