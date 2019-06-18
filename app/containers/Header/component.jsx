import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLogged, removeSessionId }) => (
  <header className="header">
    <div className="header__wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar__link">
          Home
        </Link>
      </nav>
      <div className="header__btns">
        {isLogged && (
          <button
            type="button"
            className="btn btn-primary btn--small btn-login"
            onClick={() => {
              localStorage.removeItem('session_id');
              removeSessionId(null);
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  </header>
);

export default Header;