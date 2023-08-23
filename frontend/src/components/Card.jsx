import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.owner._id;
  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like_button ${isLiked && 'elements__like_button_active'}`
  )

  return (
    <div className="elements__card">
      <img className="elements__photo" src={props.link} alt={props.name} onClick={() => { props.onCardClick({ name: props.name, link: props.link }) }} />
      {isOwn && <button className="elements__trash" aria-label="Удалить" onClick={() => props.onCardDelete(props._id)}></button>}
      <div className="elements__text">
        <h2 className="elements__name">{props.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} aria-label="Нравится" onClick={() => { props.onCardLike(props.likes, props._id) }}></button>
          <span className="elenents__like_counter">{props.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;