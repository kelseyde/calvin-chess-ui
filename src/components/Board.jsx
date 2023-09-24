import '../assets/index.css'
import {useMemo, useState} from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import useSound from 'use-sound';
import gameStartSound from "../assets/sounds/game-start.mp3"
import moveSound from "../assets/sounds/move-self.mp3"
import captureSound from "../assets/sounds/capture.mp3"
import castleSound from "../assets/sounds/castle.mp3"
import checkSound from "../assets/sounds/move-check.mp3"
import promotionSound from "../assets/sounds/promote.mp3";

export default function Board({gameId}) {
    const game = useMemo(() => new Chess(), []);
    const [playMoveSound] = useSound(moveSound);
    const [playCheckSound] = useSound(checkSound);
    const [gamePosition, setGamePosition] = useState(game.fen());

    function onDrop(startSquare, endSquare, piece) {
        const move = {
            gameId: gameId,
            from: startSquare,
            to: endSquare,
            promotion: piece[1].toLowerCase() ?? "q",
        };
        const result = game.move(move);
        setGamePosition(game.fen());
        if (game.isCheck()) {
            playCheckSound();
        } else {
            playMoveSound();
        }
        if (result === null) return false; // illegal move
        if (game.isGameOver()) return false; // TODO needed?
        fetchEngineResponse(move);
        return true;

    }

    function fetchEngineResponse(move) {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(move)
        };
        fetch('http://localhost:8080/calvin/game/play', request)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                game.move({
                    from: data.move.from,
                    to: data.move.to,
                    promotion: data.move.promotion,
                });
                setGamePosition(game.fen());
                if (game.isCheck()) {
                    playCheckSound();
                } else {
                    playMoveSound();
                }
            });
    }


    return (
        <div id="ChessBoard">
            <Chessboard id="ReactChessboard"
                        position={gamePosition}
                        onPieceDrop={onDrop}
            />
        </div>
    )
}

