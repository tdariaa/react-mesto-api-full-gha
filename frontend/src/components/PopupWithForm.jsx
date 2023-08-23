import React from 'react';

function PopupWithForm(props) {
  return (

    <div className={`popup popup_${props.name} ${props.isOpen? 'popup_opened': ''}`} >
      <div className={`popup__container popup__container_${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>

        <form className={`popup__form popup__form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button">{props.button_title}</button>
        </form>

        <button className={`popup__close popup__close_${props.name}`} aria-label="Закрыть" onClick={props.onClose}>
        </button>
      </div>
    </div>

  )
}

export default PopupWithForm;