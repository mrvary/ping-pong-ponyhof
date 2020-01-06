import React from "react";

function Footer({ title }) {
  return (
    <footer className="footer__container">
      <p className="footer__text">
        <strong>{title}</strong> by coolest guys ever.
      </p>
    </footer>
  );
}

export default Footer;
