import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import { login } from '~/services/authentication';
import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';

import './login-style.scss';

const Button: React.FC = () => (
  <button type="submit" className="button mt-24px">
    Login
  </button>
);

const Login: React.FC = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login(username, password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">
          Password Health
        </h1>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <ErrorBlock error={errorMessage}/>
        {isLoading ? <LoadingScreen /> : <Button />}
      </form>
    </div>
  );
};

export default Login;
