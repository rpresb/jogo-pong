import React, { useContext } from 'react';
import { createRoom, joinRoom, leaveRoom, GameContext } from '../contexts/GameContext';

const Rooms = () => {
    const { player, rooms, room } = useContext(GameContext);

    return (
        <div className='list-group'>
            <span className='list-title'>
                Salas
                {!player.room && <button onClick={createRoom}>Criar Sala</button>}
            </span>
            {!player.room &&
                Object.keys(rooms).map((key) =>
                    <div key={`room_${key}`} className='list-item'>
                        {rooms[key].name}
                        {rooms[key].score1 === undefined &&
                            <button onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Entrar</button>
                        }
                        {rooms[key].score1 !== undefined && 
                            <span>{rooms[key].score1} x {rooms[key].score2}</span>
                        }
                    </div>
                )
            }
            {player.room && room &&
                <div>
                    {rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 ?
                        <button>Iniciar Jogo</button>
                        :
                        <div className='list-item'>
                            <span>{room.name}</span>
                            <button onClick={leaveRoom}>Sair</button>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Rooms;

