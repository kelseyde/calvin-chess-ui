import './assets/index.css'
import React, { useEffect, useState } from "react"
import Board from "./components/Board.jsx";

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
      <div>
          <img src="/calvin.png" className="logo" alt="Calvin logo"/>
          <h1 className="title">Calvin Chess Engine</h1>
      </div>
      <div>
          <Board id="BasicBoard" gameId={gameId}/>
      </div>
    </>
  )
}

export default App
