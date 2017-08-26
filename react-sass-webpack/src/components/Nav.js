import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </li>
        </ul>

      </nav>
    )
  }
}

export default Nav;
