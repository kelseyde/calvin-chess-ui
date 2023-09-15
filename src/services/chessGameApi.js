export const ChessGameApi = {

    newGame: function(handleNewGameId) {
        return fetch("http://localhost:8080/calvin/game/new")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                handleNewGameId(response.gameId);
            })
    },

    playMove: function (gameId, startSquare, endSquare, handleNewPosition) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId: gameId, startSquare: startSquare, endSquare: endSquare })
        };
        console.log(requestOptions);
        fetch('http://localhost:8080/calvin/game/play', requestOptions)
            .then(response => response.json())
            .then(data => handleNewPosition(data.position));
    }

}