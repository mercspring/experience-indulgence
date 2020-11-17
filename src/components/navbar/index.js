import React, { useState } from "react";
import "./style.css";

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <nav>
        <div className="logo">Logo</div>
        <div className="header">indulge
        {/* <p className="tagLine">Savour Opulance</p> */}
        </div>
        
        <ul className="nav-links" style ={{transform: open ? "translateX(0px)" : ""}}>
          {/* <li>
            <a>Home</a>
          </li> */}
          <li>
            <a>Guest</a>
          </li>
          <li>
            <a>Chef</a>
          </li>
          <li>
            <a>Search</a>
          </li>
        </ul>
        <i onClick = {() => setOpen(!open)} className="fas fa-bars burgerMenu"></i>
      </nav>
    </div>
  );
}

export default NavBar;
