import React, { useReducer, useEffect } from 'react';
import socketClient from 'socket.io-client';

const socket = socketClient(process.env.REACT_APP_SOCKET_ADDRESS, {
  autoConnect: false,
});

const GameContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
      };
    case 'RESET_STATE':
      return { ...initialState, isConnected: state.isConnected };
    case 'PLAYER':
      return {
        ...state,
        player: action.payload,
      };
    case 'PLAYERS':
      return {
        ...state,
        players: action.payload,
      };
    case 'ROOM':
      if (state.players[action.payload]) {
        return {
          ...state,
          room: state.rooms[state.players[action.payload].room],
        };
      }
    case 'ROOMS':
      return {
        ...state,
        rooms: action.payload,
      };
    case 'MATCH':
      return {
        ...state,
        match: action.payload,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

const initialState = {
  isConnected: false,
  player: {},
  room: {},
  rooms: {},
  players: {},
  messages: [],
  match: {},
};

const GameProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.on('connect', () => {
      if (localStorage.getItem('player')) {
        socket.emit('Reconnect', JSON.parse(localStorage.getItem('player')));
      }

      dispatch({ type: 'CONNECTED', payload: true });
    });
    socket.on('disconnect', () => {
      dispatch({ type: 'CONNECTED', payload: false });
    });
    socket.on('PlayersRefresh', (players) => {
      const player = players[socket.id];
      if (player) {
        localStorage.setItem('player', JSON.stringify(player));
        dispatch({ type: 'PLAYER', payload: players[socket.id] });
      } else {
        dispatch({ type: 'RESET_STATE' });
      }

      dispatch({ type: 'PLAYERS', payload: players });
    });
    socket.on('ReceiveMessage', (receivedMessage) => {
      dispatch({ type: 'ADD_MESSAGE', payload: receivedMessage });
    });
    socket.on('RoomsRefresh', (rooms) => {
      dispatch({ type: 'ROOMS', payload: rooms });
      dispatch({ type: 'ROOM', payload: socket.id });
    });
    socket.on('MatchRefresh', (match) => {
      dispatch({ type: 'MATCH', payload: match });
    });
    socket.on('MatchClear', () => {
      dispatch({ type: 'MATCH', payload: {} });
    });
    socket.open();
  }, []);

  return (
    <GameContext.Provider value={state}>{props.children}</GameContext.Provider>
  );
};

const sendMessage = (message) => {
  socket.emit('SendMessage', message);
};

const createRoom = () => {
  socket.emit('CreateRoom');
};

const leaveRoom = () => {
  socket.emit('LeaveRoom');
};

const joinRoom = (roomId) => {
  socket.emit('JoinRoom', roomId);
};

const gameLoaded = () => {
  socket.emit('GameLoaded');
};

const login = (name) => {
  socket.emit('Login', name);
};

let lastType = undefined;
const sendKey = (type, key) => {
  if (lastType === type) {
    return;
  }

  lastType = type;
  socket.emit('SendKey', { type, key });
};

export {
  GameContext,
  GameProvider,
  sendMessage,
  createRoom,
  leaveRoom,
  joinRoom,
  gameLoaded,
  sendKey,
  login,
};
