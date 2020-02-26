import React from 'react';
import './Button.css';

function Button({
  primText,
  primOnClick,
  secText,
  secOnClick,
  mode,
  disableProp
}) {
  let css = 'button ';
  let text;
  let onClick;

  if (mode === 'primary') {
    css = css + 'button--primary';
    text = primText;
    onClick = primOnClick;
  } else {
    css = css + 'button--secondary';
    text = secText;
    onClick = secOnClick;
  }
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
