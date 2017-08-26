import React from 'react';

// components
import Nav      from './Nav';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Nav />
      </div>
    )
  }
}

export default Header;
