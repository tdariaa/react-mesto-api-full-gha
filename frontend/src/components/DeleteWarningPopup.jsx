import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function DeleteWarningPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  } 

  return (
    <PopupWithForm name="warning" title="Вы уверены?" button_title="Да"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  />
  )
}

export default DeleteWarningPopup;