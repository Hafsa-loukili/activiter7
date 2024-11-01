import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) => {
    if (name === errorMessages.name) {
      return (
        <div className='error'>{errorMessages.message}</div>
      );
    }
  };

  const database = [
    { username: "hafsa", password: "1234" },
    { username: "sara", password: "1234" }
  ];

  const errors = {
    uname: "Votre identifiant est incorrect.",
    upass: "Votre mot de passe est incorrect."
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, upass } = document.forms[0];

    setName(uname.value);
    const userData = database.find(user => user.username === uname.value);

    if (userData) {
      if (userData.password !== upass.value) {
        setErrorMessages({ name: "upass", message: errors.upass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderForm = (
    <div className='login-form'>
      <div className='title'>Connexion</div>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>L'identifiant</label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className='input-container'>
            <label>Mot de passe</label>
            <input type="password" name="upass" required />
            {renderErrorMessage("upass")}
          </div>
          <div className="button-container">
            <input type="submit" value="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="app">
      {
        isSubmitted ? (
          <div>
            <div className="title">Accueil</div>
            <div>Bonjour {name}</div>
          </div>
        ) : renderForm
      }
    </div>
  );
}

export default App;
