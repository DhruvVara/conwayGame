import React from 'react';

const Cell = ({ alive, toggleCell }) => {
  const cellStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: alive ? 'black' : 'white',
    border: 'solid 1px black'
  };

  return <div style={cellStyle} onClick={toggleCell}></div>;
};

export default Cell;
