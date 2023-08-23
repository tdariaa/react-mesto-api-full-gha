import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardDelete, onCardClick, onCardLike, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (

    <>
      <section className="profile">
        <button className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Фотография профиля." className="profile__image" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" aria-label="Изменить" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((props) => {
          return <Card key={props._id} {...props} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} />
        }
        )}
      </section>
    </>

  );
}

export default Main;