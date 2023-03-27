import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Box} from "./components/box"
import {Board} from "./components/board"
import { ScoreBoard } from './components/scoreBoard'
import { ResetButton } from './components/resetButton'

function App() {


  const winConditions = [
    [0,1,2],[3,4,5],[7,8,9],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]

  const [board,setBoard]=useState(Array(9).fill(null))
  const [xPlaying,setXPlaying]=useState(true);
  const [gameOver,setGameOver]=useState(false);
  const [scores, setScores]=useState({xScore :0, oScore:0})
  const handleBoxClick = (indexBox) => {
      const updatedBoard = board.map((value, index) => {
        if(index===indexBox){
          return xPlaying === true ? "X" : "O";
        } else {
          return value;
        }
      })

      const winner = checkWinner(updatedBoard);
      if (winner){
        if (winner === "O"){
          let {oScore} = scores;
          oScore+=1;
          setScores({...scores, oScore});
        }
        else {
          let {xScore} = scores;
          xScore+=1;
          setScores({...scores, xScore});
        }
      }

      
      setBoard(updatedBoard);

      setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i=0; i<winConditions.length; i++){
      const [x,y,z] =winConditions[i];
      if (board[x] && board[x] === board[y] && board[z] === board[y]){
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <ScoreBoard scores ={scores} xPlaying={xPlaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard={resetBoard} />
    </div>
  )
}

export default App
