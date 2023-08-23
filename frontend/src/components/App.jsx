import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup .jsx'
import DeleteWarningPopup from './DeleteWarningPopup.jsx';
import '../App.css';

import Register from './Register.jsx';
import LogIn from './LogIn.jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import * as auth from '../utils/auth.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isPopupWithImageOpen, setPopupWithImageOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectedCardId, setSelectedCardId] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [registerMassage, setRegisterMassage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api.getAllNeededData()
        .then(function (value) {
          const [cardsInfo, profileInfo] = value;
          setCurrentUser(profileInfo);
          setCards(cardsInfo);
        })

        .catch(function (value) {
          console.log('Ошибка:' + value);
        })
    }
  }, [loggedIn])

  function closeAllPopup() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setPopupWithImageOpen(false);
    setDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleDeleteClick(cardId) {
    setSelectedCardId(cardId);
    setDeletePopupOpen(true);
  }

  function handleCardDelete() {
    api.deleteCard(selectedCardId)
      .then((value) => {
        setCards(cards.filter((card) => card._id !== selectedCardId));
        setDeletePopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
    setPopupWithImageOpen(true);
  }

  function handleCardLike(likes, cardId) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? newCard : c
        ));
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleUpdateUser(data) {
    api.patchProfileData(data)
      .then((profileData) => {
        setCurrentUser(profileData);
        setEditProfilePopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        setEditAvatarPopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleRegistration() {
    setInfoTooltipOpen(true);
  }
  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((data) => {
        setRegistrationSuccess(true);
        navigate('/signin');
        setRegisterMassage('Вы успешно зарегистрировались!');
        handleRegistration();
      })
      .catch(function (value) {
        setRegistrationSuccess(false);
        setRegisterMassage('Что-то пошло не так! Попробуйте ещё раз.');
        handleRegistration();
        console.log(value);
      })
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
          checkToken();
        }
      })
      .catch(function (value) {
        console.log(value);
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          setUserData(data);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(function (value) {
          setLoggedIn(false);
          console.log('Ошибка:' + value);
        })
    }
  }

  React.useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signup');
    setLoggedIn(false);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>
          <Route path="/signup" element={
            <>
              <Header link="/signin" linkTitle="Войти" />
              <Register onRegistration={handleRegisterSubmit} />
            </>
          } />

          <Route path="/signin" element={
            <>
              <Header link="/signup" linkTitle="Регистрация" />
              <LogIn handleLogin={handleLogin} />
            </>

          } />

          <Route path="/" element={
            <>
              <Header linkTitle="Выйти" userData={userData} onExit={signOut} />
              <ProtectedRouteElement element={Main} loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleDeleteClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards} />
            </>
          } />

          <Route path='*' element={<Navigate to="/signin" replace />} />

        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteWarningPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopup}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupWithImageOpen}
          onClose={closeAllPopup}
        />

        <InfoTooltip
          title={registerMassage}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopup}
          onRegistration={handleRegistration}
        />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
