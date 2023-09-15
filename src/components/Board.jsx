import '../assets/index.css'
import { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Board({gameId}) {
    const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [promotionType, setPromotionType] = useState(undefined);

    function onMove(startSquare, endSquare, piece) {
        console.log(`start square ${startSquare}, end square ${endSquare}, piece ${piece}`);
        const promotionPieceCodeMap = {
            'B': 'BISHOP',
            'N': 'KNIGHT',
            'R': 'ROOK',
            'Q': 'QUEEN',
        }

        let data = {
            gameId: gameId,
            startSquare: startSquare,
            endSquare: endSquare
        };
        console.log(promotionPieceCodeMap[piece[1]]);
        console.log(!!promotionPieceCodeMap[piece[1]])
        if (!!promotionPieceCodeMap[piece[1]]) {
            data.promotionPieceType = promotionPieceCodeMap[piece[1]];
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        console.log(requestOptions);
        fetch('http://localhost:8080/calvin/game/play', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.result.validMove) {
                    console.log("Invalid move!");
                } else {
                    setPosition(data.position);
                }
            });

    }
    function onPositionChange(positionObject) {
        console.log(positionObject);
    }
    return (
        <div>
            <Chessboard id="BasicBoard"
                        position={position}
                        onPieceDrop={onMove}
                        getPositionObject={onPositionChange}
            />
        </div>
    )
}

