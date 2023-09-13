import { useState } from 'react'
import './App.css'
import { Chessboard } from "react-chessboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src="/calvin.png" className="logo"/>
          <h1>Calvin Chess Engine</h1>
      </div>
      <div>
          <Chessboard id="BasicBoard" />
      </div>
    </>
  )
}

export default App
