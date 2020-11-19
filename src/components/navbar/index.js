import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChefSignin from "../chef-signin"
import Modal from '@material-ui/core/Modal';
import "./style.css";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [openSignin, setSigninOpen] = useState(false);

  const handleOpen = () => {
    setSigninOpen(true);

  }
  const handleClose = () => {
    setSigninOpen(false);
  }

  return (
    <div>
      <nav>
        <Link to={"/search"}><div className="logo">Logo</div></Link>
        <div className="header">indulge
        {/* <p className="tagLine">Savour Opulance</p> */}
        </div>

        <ul className="nav-links" style={{ transform: open ? "translateX(0px)" : "" }}>
          {/* <li>
            <a>Home</a>
          </li> */}
          <li>
            <Link to={"/signup"}>Chef Sign-up</Link>
          </li>
          <li>
            <span onClick={handleOpen}>Chef Sign-in</span>
            <Modal
              open={openSignin}
              onClose={handleClose}
              style={{alignItems: "center", justifyContent: "center", display:"flex"}}
            >
              <ChefSignin handleClose={handleClose}/>
            </Modal>
          </li>
          <li>
            <Link to={"/search"}>Search</Link>
          </li>
        </ul>
        <i onClick={() => setOpen(!open)} className="fas fa-bars burgerMenu"></i>
      </nav>
    </div>
  );
}

export default NavBar;
