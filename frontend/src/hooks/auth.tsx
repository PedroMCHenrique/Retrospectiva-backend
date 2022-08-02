import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface User {
   token: string;
   name: string;
   email: string;
   username: string;
   avatar?: string;
   description?: string;
}

interface SignInProps {
   email: string;
   password: string;
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
      async function getData() {
         const token = localStorage.getItem("retrospectiva@token");

         if (!token) {
            navigate("/");
            return;
         }

         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         try {
            const { data } = await api.post("/me");
            setUser({
               name: data.user.name,
               email: data.user.email,
               username: data.user.username,
               avatar: data.user.avatar,
               description: data.user.description,
               token,
            });

            navigate("/home");
         } catch (error) {
            signOut();
            return;
         }
      }

      getData();
   }, []);

   async function signIn({ email, password }: SignInProps) {
      const { data } = await api.post("/login", {
         email,
         password,
      });

      if (data.error) {
         toast.warning(data.message);
         return;
      }

      if (!data.error) {
         setUser({
            token: data.token,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            avatar: data.user.avatar,
            description: data.user.description,
         });

         localStorage.setItem("retrospectiva@token", data.token);
         api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
         navigate("/home");
      }
   }

   function signOut() {
      delete api.defaults.headers.common["Authorization"];

      localStorage.removeItem("retrospectiva@token");

      setUser({} as User);
      navigate("/");
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
