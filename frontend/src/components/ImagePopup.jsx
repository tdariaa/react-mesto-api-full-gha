import React from 'react';

function ImagePopup(props) {

  return (

    <div className={`popup popup_picture ${props.isOpen? 'popup_opened': ''}`}>
    <div className="popup__picture-container">
      <img className="popup__photo" src={props.isOpen? props.card.link : '#'} alt={props.isOpen? props.card.name : ''} />
      <p className="popup__text">{props.isOpen? props.card.name : ''}</p>
      <button className="popup__close popup__close_picture" aria-label="Закрыть" onClick={props.onClose}></button>
    </div>
  </div>
  )
}

export default ImagePopup;