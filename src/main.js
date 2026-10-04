import { createHeader } from "./components/header/header.js";
import { createFooter } from "./components/footer/footer.js";
import { createGame } from "./game/game.js";

const GITHUB_URL = "https://github.com/al-lumiere";

const app = document.createElement("div");
app.className = "app";

const game = createGame();

const header = createHeader({
  onNewGame: game.newGame,
  onOpenLeaderboard: () => {
    console.log("Open leaderboard");
  },
});

const footer = createFooter(GITHUB_URL);

app.append(header, game.element, footer);
document.body.append(app);