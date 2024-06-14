import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IContextType, IUser } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api.ts';
import { useNavigate } from 'react-router-dom';

const INITIAL_USER: IUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};
const INITIAL_STATE: IContextType = {
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};
const AuthContext =
  createContext<IContextType>(INITIAL_STATE);
const AuthContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]') {
      navigate('/sign-in');
    }
    checkAuthUser();
  }, []);
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
