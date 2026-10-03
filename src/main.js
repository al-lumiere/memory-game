import { createHeader } from "./components/header/header.js";
import { createFooter } from "./components/footer/footer.js";

const GITHUB_URL = "https://github.com/al-lumiere";

const app = document.createElement("div");
app.className = "app";

const header = createHeader({
  onNewGame: () => {
    console.log("New game");
  },
  onOpenLeaderboard: () => {
    console.log("Open leaderboard");
  },
});

const footer = createFooter(GITHUB_URL);

app.append(header, footer);
document.body.append(app);