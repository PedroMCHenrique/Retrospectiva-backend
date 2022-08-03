import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { api } from '../services/api';

interface User {
  token: string;
  name: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface Payload {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User;
  signIn: (credential: SignInProps) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const token = localStorage.getItem('retrospectiva@token');
    if (!token) return signOut();
    setInformation(token);
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });

      if (!data.error && data.token) {
        setInformation(data.token);
      } else {
        toast.warning('E-mail ou senha incorreto');
      }
    } catch (error) {
      toast.warning('E-mail ou senha incorreto');
    }
  }

  function setInformation(token: string) {
    const { name } = jwt_decode(token) as Payload;

    setUser({
      token: token,
      name: name,
    });

    localStorage.setItem('retrospectiva@token', token);
    localStorage.setItem('retrospectiva@name', name);
    api.defaults.headers.common['Authorization'] = `${token}`;
    navigate('/home');
  }

  function signOut() {
    delete api.defaults.headers.common['Authorization'];

    localStorage.removeItem('retrospectiva@token');
    localStorage.removeItem('retrospectiva@name');

    setUser({} as User);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
