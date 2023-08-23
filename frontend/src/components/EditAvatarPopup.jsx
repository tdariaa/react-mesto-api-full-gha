import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function EditAvatarPopup(props) {

  const avatar = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar.current.value);
  } 

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" button_title="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="popup__form-avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку"
          name="avatar" type="url" required ref={avatar} />
        <span className="popup__form-error popup__form-avatar-error popup__form-error_active"></span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;


