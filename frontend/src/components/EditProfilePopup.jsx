import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../context/CurrentUserContext.js';


function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" button_title="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="popup__form-name" className="popup__input popup__input_type_name" placeholder="Имя"
          name="username" minLength={2} maxLength={40} required onChange={handleChangeName} value={name ? name : ''} />
        <span className="popup__form-error popup__form-name-error popup__form-error_active"></span>
        <input id="popup__form-about" className="popup__input popup__input_type_about" placeholder="О себе"
          name="about" minLength={2} maxLength={200} required onChange={handleChangeDescription} value={description ? description : ''} />
        <span className="popup__form-error popup__form-about-error popup__form-error_active"></span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;