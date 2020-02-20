import React, { useContext } from 'react';
import PLayerList from './PlayerList';
import Chat from './Chat';
import { GameContext, sendMessage, createRoom, leaveRoom, joinRoom } from '../contexts/GameContext';

const Pong = () => {
    const { isConnected, players, messages, player, rooms } = useContext(GameContext);

    return (
        <>
            {!isConnected &&
                <div>Desconectado, conectando...</div>
            }

            <div>
                <div style={{ marginBottom: '20px' }}>
                    {!player.room &&
                        <div>
                            <button onClick={createRoom}>Criar Sala</button>
                            {Object.keys(rooms).map((key) =>
                                <div key={`room_${key}`}>
                                    {rooms[key].name}
                                    <button onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Entrar</button>
                                </div>
                            )}
                        </div>
                    }
                    {player.room &&
                        <div>
                            {rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 ?
                                <button>Iniciar Jogo</button>
                                :
                                <>
                                    Aguardando outro jogador conectar na sala
                                    <button onClick={leaveRoom}>Sair da Sala</button>
                                </>
                            }
                        </div>
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <PLayerList players={players} />
                    <Chat sendMessage={sendMessage} messages={messages} />
                </div>
            </div>
        </>
    );
};

export default Pong;
