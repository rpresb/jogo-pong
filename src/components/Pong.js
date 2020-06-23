import React, { useContext } from 'react';
import PlayerList from './PlayerList';
import Chat from './Chat';
import { GameContext, sendMessage } from '../contexts/GameContext';
import Rooms from './Rooms';
import Game from './Game';
import { Login } from './Login';

const Pong = () => {
  const { isConnected, player, players, messages, match } = useContext(
    GameContext
  );

  if (!isConnected) {
    return <div>Desconectado, conectando...</div>;
  }

  if (Object.keys(player).length === 0) {
    return <Login />;
  }

  console.log(match.status);

  if (match.status) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Game />
        <pre>
          <code>{JSON.stringify(match, null, 2)}</code>
        </pre>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='list-container'>
        <Rooms />
        <PlayerList players={players} />
      </div>
      <Chat sendMessage={sendMessage} messages={messages} />
    </div>
  );
};

export default Pong;
