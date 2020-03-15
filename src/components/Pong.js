import React, { useContext } from 'react';
import PlayerList from './PlayerList';
import Chat from './Chat';
import { GameContext, sendMessage } from '../contexts/GameContext';
import Rooms from './Rooms';
import Game from './Game';

const Pong = () => {
    const { isConnected, players, messages, match } = useContext(GameContext);

    return (
        <>
            {!isConnected &&
                <div>Desconectado, conectando...</div>
            }

            {match.status &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Game />
                    <pre>
                        <code>{JSON.stringify(match, null, 2)}</code>
                    </pre>
                </div>
            }

            {!match.status &&
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='list-container'>
                        <Rooms />
                        <PlayerList players={players} />
                    </div>
                    <Chat sendMessage={sendMessage} messages={messages} />
                </div>
            }
        </>
    );
};

export default Pong;
