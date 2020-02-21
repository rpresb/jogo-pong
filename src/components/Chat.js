import React, { useState, useEffect } from 'react';

const Chat = (props) => {
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = () => {
        props.sendMessage(messageToSend);
        setMessageToSend('');
    };

    useEffect(() => {
        const elem = document.getElementById('chat-content');
        elem.scrollTop = elem.scrollHeight;
    }, [props.messages]);

    return (
        <div className='chat-container'>
            <div id='chat-content' className='chat-content'>{props.messages.join('\n\n')}</div>

            <div className='chat-form'>
                <input
                    type='text'
                    value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)}
                />
                <button
                    disabled={!messageToSend.trim()}
                    className={!messageToSend.trim() ? 'disabled' : ''}
                    onClick={sendMessage}
                >Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
