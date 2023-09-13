import '../assets/index.css'
import { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Board({gameId}) {
    const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    function onMove(startSquare, endSquare) {
        console.log(`start square ${startSquare}, end square ${endSquare}`);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId: gameId, startSquare: startSquare, endSquare: endSquare })
        };
        console.log(requestOptions);
        fetch('http://localhost:8080/calvin/game/play', requestOptions)
            .then(response => response.json())
            .then(data => setPosition(data.position));

    }
    function onPositionChange(positionObject) {
        console.log(positionObject);
    }
    return (
        <div>
            <Chessboard id="BasicBoard" position={position} onPieceDrop={onMove} getPositionObject={onPositionChange}/>
        </div>
    )
}

