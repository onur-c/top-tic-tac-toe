const Gameboard = (()=>{
    let board = ["","","","","","","","","",];
    let boardVisible = false;

    const drawBoard = () => {
        // only generate divs first time
        if(boardVisible) return;
        // generate divs 
        let gameboard = document.getElementById("gameboard");
        gameboard.classList.toggle("inactive");
        board.forEach((cell,index)=>{
            
            let squareCell = document.createElement("div");
            squareCell.classList.add("square");
            squareCell.id = index;     
            squareCell.addEventListener("click",Game.placeMark);
            gameboard.appendChild(squareCell);  

            
        });
        boardVisible = true;
        
    }

    

    return {board,drawBoard};

})();

const Player = (name,mark) => {
    const getName = ()=>    name;
    const getMark = ()=>    mark;

    return {getMark,getName};
}


const Game = (()=>{
    let turn = 0;
    const player1 = Player(document.getElementById("player-1").value,"X");
    const player2 = Player(document.getElementById("player-2").value,"O");

    


    const startGame = () => {
        document.getElementById("start-btn").addEventListener("click",Gameboard.drawBoard);
        

    }
    const placeMark = (event)=> {
        
        
        if(event.target.innerHTML==="X"||event.target.innerHTML==="O") return;

        if(turn%2===0){
            let targetIndex= event.target.id;
            Gameboard.board[targetIndex]=player1.getMark();
            event.target.innerHTML = player1.getMark();
            turn++;
        } else {
            let targetIndex= event.target.id;
            Gameboard.board[targetIndex]=player2.getMark();
            event.target.innerHTML = player2.getMark();
            turn--;
        }
        console.log(player1.getName() , player2.getName());
        console.log(Gameboard.board);
        
         
    }


    return {startGame,placeMark};
})();


Game.startGame();

