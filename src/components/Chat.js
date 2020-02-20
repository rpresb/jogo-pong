import React, { useState } from 'react';

const Chat = (props) => {
    const [messageToSend, setMessageToSend] = useState('');

    return (
        <div style={{ flex: 1 }}>
            <div style={{ whiteSpace: 'pre-wrap' }}>{props.messages.join('\n\n')}</div>
            <input
                type='text'
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
            />
            <button
                onClick={() => props.sendMessage(messageToSend)}
            >Enviar</button>
        </div >
    );
};

export default Chat;
