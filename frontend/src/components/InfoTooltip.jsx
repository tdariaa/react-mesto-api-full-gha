import React from 'react';
import union from '../images/Union.svg'
import unionError from '../images/Union-error.svg'

function InfoTooltip(props) {

  return (

    <div className={`popup popup_infoTooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_infoTooltip-container">

        <img src={props.isSuccess ? union : unionError} alt="union label" className="popup__union" />
        <h2 className="popup__title popup__title_auth">
          {props.title}
        </h2>

        <button className="popup__close popup__close_infoTooltip" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;