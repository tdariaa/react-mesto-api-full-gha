import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  const [open, setOpen] = React.useState(false);

  return (
    <header className={`header ${open ? 'header_open' : ''}`}>
      <img className="header__logo" src={logo} alt="Логотип." />
      <div className="header__info">
        {props.link ? <Link to={props.link} className="header__info header__info_type_auth">{props.linkTitle}</Link> :
          <>
          <button className={`header__burger-button ${open ? 'header__burger-button_open' : ''}`} onClick={()=>{setOpen(!open)}}></button>
            <div className={`header__info-container ${open ? 'header__info-container_open' : ''}`}>
              {props.userData && <p className="header__info header__info_type_email">{props.userData.email}</p>}
              <button className="header__info header__info_type_signout" onClick={() => {props.onExit(); setOpen(false)}}>{props.linkTitle}</button>
            </div>
          </>
        }

      </div>
    </header>
  );
}

export default Header;



