import React from 'react';
import Authentication from './Authentication.jsx';

function Register(props) {
  const email = React.useRef();
  const password = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegistration(password.current.value, email.current.value);
  };

  return (
    <Authentication title="Регистрация" buttonTitle="Зарегистрироваться" link="/login" onSubmit={handleSubmit}>
      <input id="auth__email" className="auth__input auth__input_type_email" placeholder="Email" ref={email} required />
      <input id="auth__password" className="auth__input auth__input_type_password" placeholder="Пароль" type="password" autoComplete="on" ref={password} required />
    </Authentication>
  )
}

export default Register;

