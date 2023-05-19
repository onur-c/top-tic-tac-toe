const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  //   let winningCombinations = [
  //     [1, 2, 3],
  //     [4, 5, 6],
  //     [7, 8, 9],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [3, 6, 9],
  //     [1, 5, 9],
  //     [3, 5, 7],
  //   ];
  let boardVisible = false;

  const drawBoard = () => {
    // only generate divs first time
    if (boardVisible) return;
    // generate divs
    let gameboard = document.getElementById("gameboard");
    gameboard.classList.toggle("inactive");
    board.forEach((cell, index) => {
      let squareCell = document.createElement("div");
      squareCell.classList.add("square");
      squareCell.id = index;
      squareCell.addEventListener("click", (event) => {
        Game.placeMark(event);
        Game.checkWin(event);
      });
      gameboard.appendChild(squareCell);
    });
    boardVisible = true;
  };

  return { board, drawBoard };
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getMark, getName };
};

let player1;
let player2;

const Game = (() => {
  let turn = 0;

  // Create players
  const getPlayers = () => {
    player1 = Player(document.getElementById("player-1").value, "X");
    player2 = Player(document.getElementById("player-2").value, "O");
  };
  // places mark according to player1 and player2's "mark" value, only a string for now
  const placeMark = (event) => {
    // if clicked cell has any innerhtml return
    if (
      event.target.innerHTML === player1.getMark() ||
      event.target.innerHTML === player2.getMark()
    )
      return;

    // Place marks according to "turn" even-player1, odd-player2
    // Also update Gameboard.board[event.target.id]
    if (turn % 2 === 0) {
      let targetIndex = event.target.id;
      Gameboard.board[targetIndex] = player1.getMark();
      event.target.innerHTML = player1.getMark();
      turn++;
    } else {
      let targetIndex = event.target.id;
      Gameboard.board[targetIndex] = player2.getMark();
      event.target.innerHTML = player2.getMark();
      turn++;
    }
  };
  // Checks if winning combination is present
  //
  const checkWin = (event) => {
    // get clicked cell's id, then
    // check cell's value if its X or O to decided which player won.
    let index = event.target.id;

    let table = Gameboard.board;

    let getWinnerMsg = () => {
      if (table[index] === "O") {
        return player2.getName() + "wins";
      }
      if (table[index] === "X") {
        return player1.getName() + "wins";
      }
    };

    // winning logic
    // !! repeating code !! will be refactored

    if (!(table[0] === "") && table[0] === table[1] && table[1] === table[2]) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[3] === "") &&
      table[3] === table[4] &&
      table[4] === table[5]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[6] === "") &&
      table[6] === table[7] &&
      table[7] === table[8]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[0] === "") &&
      table[0] === table[3] &&
      table[3] === table[6]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[1] === "") &&
      table[1] === table[4] &&
      table[4] === table[7]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[2] === "") &&
      table[2] === table[5] &&
      table[5] === table[8]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[0] === "") &&
      table[0] === table[4] &&
      table[4] === table[8]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    } else if (
      !(table[6] === "") &&
      table[6] === table[4] &&
      table[4] === table[2]
    ) {
      let winner = getWinnerMsg();
      showWinMsg(winner);
    }
    if (turn === 9) console.log("Its a tie");
  };

  const showWinMsg = (msg) => {
    let heroText = document.getElementById("hero-text");
    if (heroText.childNodes.length > 2) return;
    let msgEl = document.createElement("div");
    msgEl.classList.add("win-msg");
    msgEl.innerHTML = `<p>${msg} </p>`;
    heroText.append(msgEl);
  };

  return { getPlayers, placeMark, checkWin, player1, player2 };
})();

// Bind start button with drawboard + start game
document.getElementById("start-btn").addEventListener("click", () => {
  Gameboard.drawBoard();
  Game.getPlayers();
});

// TODO  will add restart button

// TODO will end game after win
