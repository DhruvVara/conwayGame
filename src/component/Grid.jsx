import React, { useState, useCallback, useEffect, useRef } from 'react';
import Cell from './Cell';

const numRows = 25;
const numCols = 25;

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > 0.7));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const toggleCell = useCallback((row, col) => {
    setGrid(prevGrid => {
      return prevGrid.map((rowArr, rowIndex) =>
        row === rowIndex
          ? rowArr.map((cell, colIndex) =>
              col === colIndex ? !cell : cell
            )
          : rowArr
      );
    });
  }, []);

  const startSimulation = useCallback(() => {
    setRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setRunning(false);
  }, []);

  const resetGrid = useCallback(() => {
    const newGrid = [];
    for (let i = 0; i < numRows; i++) {
      newGrid.push(Array.from(Array(numCols), () => false));
    }
    setGrid(newGrid);
    setRunning(false);
  }, []);

  const randomizeGrid = useCallback(() => {
    const newGrid = [];
    for (let i = 0; i < numRows; i++) {
      newGrid.push(Array.from(Array(numCols), () => Math.random() > 0.7));
    }
    setGrid(newGrid);
    setRunning(false);
  }, []);

  const clearGrid = useCallback(() => {
    const newGrid = [];
    for (let i = 0; i < numRows; i++) {
      newGrid.push(Array.from(Array(numCols), () => false));
    }
    setGrid(newGrid);
    setRunning(false);
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      if (!runningRef.current) {
        return;
      }

      setGrid(prevGrid => {
        const newGrid = [];
        for (let i = 0; i < numRows; i++) {
          newGrid.push(Array.from(Array(numCols), () => false));
        }

        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            const neighbors = [
              [i - 1, j - 1],
              [i - 1, j],
              [i - 1, j + 1],
              [i, j - 1],
              [i, j + 1],
              [i + 1, j - 1],
              [i + 1, j],
              [i + 1, j + 1]
            ];
            let aliveNeighbors = 0;
            neighbors.forEach(([x, y]) => {
              if (
                x >= 0 &&
                x < numRows &&
                y >= 0 &&
                y < numCols &&
                prevGrid[x][y]
              ) {
                aliveNeighbors++;
              }
            });

            if (prevGrid[i][j]) {
              if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                newGrid[i][j] = true;
              } else {
                newGrid[i][j] = false;
              }
            } else {
              if (aliveNeighbors === 3) {
                newGrid[i][j] = true;
              } else {
                newGrid[i][j] = false;
              }
            }
          }
        }

        return newGrid;
      });
    };

    const interval = setInterval(gameLoop, 100);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={startSimulation} disabled={running}>
          Start
        </button>
        <button onClick={stopSimulation} disabled={!running}>
          Stop
        </button>
        <button onClick={resetGrid}>
          Reset
        </button>
        <button onClick={randomizeGrid}>
          Random
        </button>
        <button onClick={clearGrid}>
          Clear
        </button>
      </div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              alive={cell}
              toggleCell={() => toggleCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
