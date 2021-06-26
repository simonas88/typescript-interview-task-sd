import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

type UserContextProviderProps = {
  children: JSX.Element
}

interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUser>({
  updateUser: () => void {},
  deleteData: () => void {},
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
});

export const useUserContext = (): IUser => useContext(UserContext);

export const UserContextProvider = ({ children }: UserContextProviderProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [id, setId] = useState<string>(null);

  const updateUser = async (): Promise<void> => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(getUrl(API.User), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      setUsername(data?.username);
      setEmail(data?.email);
      setId(data?.id);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const deleteData = (): void => {
    setErrorMessage(null);
    setIsLoading(false);
    setUsername(null);
    setEmail(null);
    setId(null);
  };

  useEffect(() => {
    updateUser();
  }, []);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
