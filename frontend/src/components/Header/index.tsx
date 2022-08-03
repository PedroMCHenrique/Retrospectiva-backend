import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import expresso from '../../assets/logo-expresso17.svg';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';

export function Header() {
  const { signOut } = useAuth();
  const name = localStorage.getItem('retrospectiva@name');

  return (
    <div className="w-full bg-green-900">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-16 py-8">
        <Link to="/home">
          <img src={expresso} width="150" alt="Logo da Trybe" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <p className="text-white">
              Olá, <span>{name}</span>
            </p>
            <div className="flex items-center gap-2 justify-end text-orange-400 cursor-pointer">
              <p onClick={signOut}>sair </p> <FiLogOut />
            </div>
          </div>
          <Avatar />
        </div>
      </div>
    </div>
  );
}
