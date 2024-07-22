# Conway's Game of Life
This project implements Conway's Game of Life using React. The grid component allows users to interact with the simulation by starting/stopping it, resetting the grid, randomizing the grid, and clearing the grid.


## Installation
- Clone the repository.
- Install dependencies using npm install.
- Start the development server with npm start.

## Technologies:
- React
- JavaScript (ES6+)

## Overview
Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It consists of a grid of cells, each of which can be alive or dead. The cells evolve based on simple rules:

- **Underpopulation:** A live cell with fewer than two live neighbors dies.

- **Survival:** A live cell with two or three live neighbors survives to the next generation.

- **Overpopulation:** A live cell with more than three live neighbors dies.

- **Reproduction:** A dead cell with exactly three live neighbors becomes alive.


## Features
- **Start/Stop Simulation:**  Begin or pause the automatic simulation of the grid's evolution.

- **Reset:** Clear the grid and stop the simulation.

- **Randomize:** Populate the grid randomly with alive or dead cells.

- **Clear:** Set all cells in the grid to be dead.


## Components

### Cell.js

Represents an individual cell in the grid.

***Props***

- **alive:** Boolean indicating if the cell is alive.

- **toggleCell:** Callback function to toggle the cell's state when clicked.


### Grid.js

The main component responsible for rendering the grid and handling simulation logic.

### State 
- **grid:** Represents the current state of the grid.

- **running:** Boolean indicating whether the simulation is running or paused.

### Methods 
- **toggleCell(row, col):** Toggles the state (alive/dead) of a cell at given coordinates.

- **startSimulation(), stopSimulation():** Controls the simulation loop.

- **resetGrid():** Clears the grid and stops the simulation.

- **randomizeGrid():** Populates the grid randomly with alive or dead cells.

- **clearGrid():** Sets all cells in the grid to be dead.

- **useEffect:** Manages the game loop for simulating cell evolution based on Conway's rules.