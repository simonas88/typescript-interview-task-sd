import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';

import { Routes } from '~/constants';
import { login } from '~/services/authentication';

import './login-style.scss';

const Login: React.FC = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleUsernameChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => setUsername(event.target.value), []);
  const handlePasswordChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => setPassword(event.target.value), []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (event): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login(username, password);
      setIsLoading(false);
      push(Routes.PasswordHealth);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }, [username, password]);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">
          Password Health
        </h1>
        <input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          type="text"
          className="input mt-52px" />
        <input
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
          className="input mt-24px" />
        <ErrorBlock error={errorMessage}/>
        <button
          type="submit"
          className="button mt-24px"
          disabled={isLoading}>
          Login
        </button>
        {isLoading ? <LoadingScreen /> : null}
      </form>
    </div>
  );
};

export default Login;
