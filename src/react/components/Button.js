import React from 'react';
import './Button.css';

function Button({ text, onClick, mode, disableProp }) {
  let css =
    'button ' + (mode === 'primary' ? 'button--primary' : 'button--secondary');
  if (disableProp) {
    css = css + ' button--disabled';
  }
  return (
    <button className={css} onClick={onClick} disabled={disableProp}>
      {text}
    </button>
  );
}
export default Button;
