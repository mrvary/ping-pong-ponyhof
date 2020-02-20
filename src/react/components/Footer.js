import React from 'react';
import './Footer.css';

function Footer({ title }) {
  return (
    <footer>
      <p className="footer__text">
        <strong>{title}</strong> by coolest guys and gals ever.
      </p>
    </footer>
  );
}

export default Footer;