import React from 'react';
import './Header.css';
import Cart from '../Cart';

function Header() {
  return (
    <div className="Header">
      <header className="App-header">
      	<h1>React &amp; Redux Cart Example</h1>
        <Cart />
      </header>
    </div>
  );
}
export default Header;
