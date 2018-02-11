import React from 'react';

const Footer = props => (
  <div className="footer">
    <div>Erdem Bircan</div>
    <div>
      <a
        style={{ textDecoration: 'none', color: 'inherit' }}
        href="https://github.com/erdembircan"
        rel="noopener noreferrer"
        target="blank"
      >
        <i className="fab fa-github-alt" />
      </a>
      <a
        style={{ textDecoration: 'none', color: 'inherit' }}
        href="https://erdembircan.github.io/"
        rel="noopener noreferrer"
        target="blank"
      >
        <i className="fas fa-code" />
      </a>
      <a
        style={{ textDecoration: 'none', color: 'inherit' }}
        href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club"
        rel="noopener noreferrer"
        target="blank"
      >
        <i className="fab fa-free-code-camp" />
      </a>
    </div>
  </div>
);

export default Footer;
