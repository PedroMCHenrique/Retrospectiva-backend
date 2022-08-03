import { Header } from '../../components/Header';
import ticket from '../../assets/ticket.png';
import { Link } from 'react-router-dom';

export function Finish() {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto p-16">
        <div className="w-full flex flex-col items-center">
          <p className="text-3xl text-orange-300">Obrigado por comprar conosco ;)</p>
          <img className="my-12" width={1000} src={ticket} alt="" />
          <Link
            className="text-green font-bold text-2xl hover:text-emerald-700"
            to="/home"
          >
            continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
