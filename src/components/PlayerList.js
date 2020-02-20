import React from 'react';

const PLayerList = (props) => {
 
    return (
        <div>
            {Object.keys(props.players)
                .map((key) => (
                    <div key={key}>{props.players[key].name}</div>
                ))
            }
        </div>
    );
};

export default PLayerList;
