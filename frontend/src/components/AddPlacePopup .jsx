import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';


function AddPlacePopup(props) {

  const [newCard, setNewCard] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setNewCard('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeNewCard(e) {
    setNewCard(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name: newCard, link: link });
  }

  return (
    <PopupWithForm name="card" title="Новое место" button_title="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="popup__form-name-card" className="popup__input popup__input_type_name-card" placeholder="Название"
          name="card" minLength={2} maxLength={30} required onChange={handleChangeNewCard} value={newCard ? newCard : ''} />
        <span className="popup__form-error popup__form-name-card-error popup__form-error_active"></span>
        <input id="popup__form-link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку"
          name="link" type="url" required onChange={handleChangeLink} value={link ? link : ''} />
        <span className="popup__form-error popup__form-link-error popup__form-error_active"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;