const STORAGE_KEY = "memory-game-results";
const MAX_RESULTS = 10;

export function getResults() {
  const savedResults = localStorage.getItem(STORAGE_KEY);

  if (!savedResults) {
    return [];
  }

  return JSON.parse(savedResults);
}

export function saveResult(moves) {
  const results = getResults();

  const result = {
    moves,
    date: new Date().toLocaleDateString("ru-RU"),
    timestamp: Date.now(),
  };

  const updatedResults = [...results, result]
    .sort((a, b) => {
      if (a.moves !== b.moves) {
        return a.moves - b.moves;
      }

      return a.timestamp - b.timestamp;
    })
    .slice(0, MAX_RESULTS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
}
