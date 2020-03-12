/**
 * @author William Kistenberger
 * @author Sophia Dietze
 */
import React from "react";
import "./Footer.css";

/**
 * credits to the coolest guys and gals ever
 */
function Footer({ title }) {
  return (
    <footer>
      <p className="footer__text">
        <strong>{title}</strong> created by Marco Goebel, Felix Breitenbach,
        William Kistenberger, Sophia Dietze, Daniel Niemczyk.
      </p>
      <p className="footer__pictureCredits">Photo by Ellen Qin on Unsplash</p>
    </footer>
  );
}

export default Footer;
