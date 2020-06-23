import React from 'react';
import { login } from '../contexts/GameContext';
import { useState } from 'react';

export const Login = () => {
  const [name, setName] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    login(name);
  };

  return (
    <main>
      <h1>Seja um Programador - Pong</h1>
      <section>
        <form onSubmit={onLogin}>
          <div className='input-group'>
            <label>Nome:</label>
            <input
              placeholder='Informe o nome para entrar no jogo'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button>Entrar</button>
        </form>
      </section>
    </main>
  );
};
