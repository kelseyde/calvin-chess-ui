import './assets/index.css'
import React, { useEffect, useState } from "react"
import SideBar from "./components/SideBar.jsx";
import Board from "./components/Board.jsx";
import GameInfo from "./components/GameInfo.jsx";

const App = () => {
    const [gameId, setGameId] = useState('');
    const getNewGameId = () => {
        return fetch("http://localhost:8080/calvin/game/new")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setGameId(response.gameId);
            })
    }

    useEffect(() => {
        getNewGameId()
    }, [])

  return (
    <>
        <div className="FlexContainer">
            <SideBar id="SideBar"/>
            <Board id="ChessBoard" gameId={gameId}/>
            <GameInfo id="GameInfo"/>
        </div>
    </>
  )
}

export default App
