import React, { useState } from "react";
import "./PlayerSetup.css";

const PlayerSetup = ({ onGameStart }) => {
  const [players, setPlayers] = useState([
    { id: 1, name: "", active: false, image: "ball.png" },
    { id: 2, name: "", active: false, image: "beaker.png" },
    { id: 3, name: "", active: false, image: "book.png" },
    { id: 4, name: "", active: false, image: "laptop.png" },
    { id: 5, name: "", active: false, image: "mic.png" },
    { id: 6, name: "", active: false, image: "paint.png" },
  ]);

  const [startingPlayer, setStartingPlayer] = useState(null);

  const handleTogglePlayer = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, active: !player.active } : player
      )
    );
  };

  const handlePlayerNameChange = (playerId, playerName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, name: playerName } : player
      )
    );
  };

  const handleStartGame = () => {
    const activePlayers = players.filter((player) => player.active);

    if (activePlayers.length > 0) {
      // make sure activePlayers have names
      const activePlayersHaveNames = activePlayers.every(
        (player) => player.name !== ""
      );

      if (!activePlayersHaveNames) {
        alert("Please enter a name for each active player.");
        return;
      }
      
      const shuffledPlayers = shuffleArray(activePlayers);
      setStartingPlayer(shuffledPlayers[0]); // Select the starting player
      onGameStart(shuffledPlayers);

      // Go to game
      window.history.pushState({}, "", "/game");
    } else {
      alert("Please select at least one active player.");
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="player-setup">
      <h2>Player Setup</h2>
      <div className="player-list">
        {players.map((player) => (
          <div key={player.id} className={`player ${player.active ? "active" : ""}`}>
            <img src={`/assets/players/${player.image}`} alt={`Player ${player.id}`} />
            <label>
              <span>Player {player.id}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={player.active}
                  onChange={() => handleTogglePlayer(player.id)}
                />
                <span className="slider round"></span>
              </label>
            </label>
            {player.active && (
              <input
                type="text"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) => handlePlayerNameChange(player.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleStartGame}>Start Game</button>
      {startingPlayer && <p>Starting Player: {startingPlayer.name}</p>}
    </div>
  );
};

export default PlayerSetup;