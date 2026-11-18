
type Direction = {
  row: number;
  col: number;
};

const directions: Direction[] = [
   { row: 0, col: 1 },   // Left to right
  { row: 1, col: 0 },   // Top to bottom
  { row: 1, col: 1 },   // Diagonal down-right
  { row: 1, col: -1 },  // Diagonal down-left
];

const SIZE = 8;

export function generatePuzzle(words: string[]) {
  const grid: string[][] = Array.from(
    { length: SIZE },
    () => Array(SIZE).fill("")
  );

  const shuffledWords = [...words].sort(() => Math.random() - 0.5);

  for (const word of shuffledWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 1000) {
      attempts++;

      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      const startRow = Math.floor(Math.random() * SIZE);
      const startCol = Math.floor(Math.random() * SIZE);

      const endRow = startRow + direction.row * (word.length - 1);
      const endCol = startCol + direction.col * (word.length - 1);

      // Make sure the word fits inside the grid
      if (
        endRow < 0 || endRow >= SIZE ||
        endCol < 0 || endCol >= SIZE
      ) {
        continue;
      }

      // Check whether the letters conflict with existing words
      let canPlace = true;

      for (let i = 0; i < word.length; i++) {
        const row = startRow + direction.row * i;
        const col = startCol + direction.col * i;

        if (grid[row][col] !== "" && grid[row][col] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (!canPlace) continue;

      // Place the word
      for (let i = 0; i < word.length; i++) {
        const row = startRow + direction.row * i;
        const col = startCol + direction.col * i;

        grid[row][col] = word[i];
      }

      placed = true;
    }

    if (!placed) {
      throw new Error(`Could not place word: ${word}`);
    }
  }

  // Fill empty spaces with random letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === "") {
        grid[row][col] =
          alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return grid;
}
