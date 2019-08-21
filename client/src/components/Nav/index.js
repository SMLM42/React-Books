import React from "react";
import "./style.css"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books Reading List
      </a>
      <a className="href_link" href="/search">
        Search Books
      </a>
      <a className="href_link" href="/saved">
        Saved Books
      </a>
    </nav>
  );
}

export default Nav;
