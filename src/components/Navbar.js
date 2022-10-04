import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <Link to="/todo">
          <h1 className="heading-nav">TodoAPP</h1>
        </Link>
        <ul className="nav-ul">
          <Link to="/todo/inprogress">
            {" "}
            <li className="nav-li">IN-PROGRESS</li>
          </Link>
          <Link to="/todo/done">
            <li className="nav-li">DONE</li>
          </Link>
          <Link to="/todo/history">
            <li className="nav-li">HISTORY</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
