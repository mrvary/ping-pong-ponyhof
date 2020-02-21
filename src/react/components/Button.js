import React from 'react';
import './Button.css';

function Button({ text, onClick, mode, disableProp }) {
  if (mode === 'leer') {
    return null;
  }
  let css =
    'button ' + (mode === 'primary' ? 'button--primary' : 'button--secondary');
  css = css + (disableProp ? ' button--disabled' : '');
  return (
    <button className={css} onClick={onClick} disabled={disableProp}>
      {text}
    </button>
  );
}
export default Button;
