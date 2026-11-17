
import { useState, useCallback, useRef } from "react";
import { animalWords } from "./data/puzzles";
import { generatePuzzle } from "./utils/generatePuzzle";
import "./App.css";

type Cell = {
  row: number;
  col: number;
};

type FoundWord = {
  word: string;
  cells: Cell[];
};

const createGame = () => generatePuzzle(animalWords);

function App() {
  const [grid, setGrid] = useState(createGame);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);

  const isSelecting = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const startNewGame = useCallback(() => {
    setGrid(createGame());
    setFoundWords([]);
    setSelectedCells([]);
    isSelecting.current = false;
  }, []);

  const handleStart = (row: number, col: number) => {
    isSelecting.current = true;
    setSelectedCells([{ row, col }]);
  };

  const handleMove = (row: number, col: number) => {
    if (!isSelecting.current) return;

    const start = selectedCells[0];
    if (!start) return;

    const rowDiff = row - start.row;
    const colDiff = col - start.col;

    if (
      rowDiff !== 0 &&
      colDiff !== 0 &&
      Math.abs(rowDiff) !== Math.abs(colDiff)
    ) {
      return;
    }

    const length =
      Math.max(Math.abs(rowDiff), Math.abs(colDiff)) + 1;

    const cells = Array.from({ length }, (_, i) => ({
      row: start.row + Math.sign(rowDiff) * i,
      col: start.col + Math.sign(colDiff) * i,
    }));

    setSelectedCells(cells);
  };

  const handleEnd = () => {
    if (!isSelecting.current) return;

    isSelecting.current = false;

    const selectedWord = selectedCells
      .map(({ row, col }) => grid[row][col])
      .join("");

    const reversedWord = selectedWord.split("").reverse().join("");

    const matchedWord = animalWords.find(
      (word) =>
        (word === selectedWord || word === reversedWord) &&
        !foundWords.some((found) => found.word === word)
    );

    if (matchedWord) {
      setFoundWords((prev) => [
        ...prev,
        {
          word: matchedWord,
          cells: [...selectedCells],
        },
      ]);
    }

    setSelectedCells([]);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isSelecting.current) return;

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    const cell = element?.closest("[data-row]");

    if (!cell) return;

    const row = Number(cell.getAttribute("data-row"));
    const col = Number(cell.getAttribute("data-col"));

    handleMove(row, col);
  };

  const isSelected = (row: number, col: number) =>
    selectedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

  const isFound = (row: number, col: number) =>
    foundWords.some((found) =>
      found.cells.some(
        (cell) => cell.row === row && cell.col === col
      )
    );

  const totalFound = foundWords.length;
  const isComplete = totalFound === animalWords.length;

  return (
    <main className="game-container">
      <header className="game-header">
        <p className="eyebrow">HAPPY HAPPY BIRTHDAY MISS SARAH JO</p>
        <h1>SPECIAL JO WORD SEARCH</h1>
        <p className="subtitle">
          Find all the hidden animals!
        </p>
      </header>

      <section className="game-content">
        <div className="puzzle-section">
          <div className="puzzle-top">
            <h2>Find the animals</h2>
            <span>
              {totalFound}/{animalWords.length} found
            </span>
          </div>

          <div className="grid-wrapper">
            <div
              className="letter-grid"
              ref={gridRef}
              onPointerMove={handlePointerMove}
              onPointerUp={handleEnd}
              onPointerCancel={handleEnd}
            >
              {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    data-row={rowIndex}
                    data-col={colIndex}
                    className={`letter-cell ${
                      isSelected(rowIndex, colIndex)
                        ? "selected"
                        : ""
                    } ${
                      isFound(rowIndex, colIndex)
                        ? "found"
                        : ""
                    }`}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      handleStart(rowIndex, colIndex);
                    }}
                    aria-label={`${letter}, row ${rowIndex + 1}, column ${colIndex + 1}`}
                  >
                    {letter}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="word-list-section">
          <h2>words</h2>

          <div className="word-list">
            {animalWords.map((word) => {
              const found = foundWords.some(
                (item) => item.word === word
              );

              return (
                <div
                  key={word}
                  className={`word-item ${
                    found ? "completed" : ""
                  }`}
                >
                  <span>{found ? "✓" : "○"}</span>
                  {word}
                </div>
              );
            })}
          </div>
        </aside>
      </section>

      {isComplete && (
        <div className="success-message">
          <h2>You found them all! 🎉</h2>
          <p>You're an animal word search superstar!</p>
        </div>
      )}

      <button className="new-game-button" onClick={startNewGame}>
        ↻ New Game
      </button>
    </main>
  );
}

export default App;
