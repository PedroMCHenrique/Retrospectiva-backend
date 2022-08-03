import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
interface ICableway {
    id: number;
    name: string;
    price: string;
    seats: number;
    image: string;
    departureTime: string;
}

interface CablewayProps {
  cableway: ICableway;
}

export function Cableway({ cableway }: CablewayProps) {
  const navigate = useNavigate();
  const { id, name, image, price, seats, departureTime } = cableway;

  function handleNavigate(id: number) {
    navigate(`/cableway/${id}`);
  }

  return (
    <div className="shadow-lg rounded max-h-96">
      <div className="relative flex justify-center h-48">
        <img src={image} className="rounded-t object-cover w-full" alt="" />
        <p className={styles.price}>
          <span>R$</span> {price}
        </p>
      </div>
      <div className="px-8 py-2">
        <p className="text-green-900 font-bold text-3xl mb-4 min-h-[72px]">{name}</p>
        <div className=" text-green">
          <p className="flex items-center justify-between gap-1">
            Lugares:
            <b>{seats}</b>
          </p>
          <p className="flex items-center justify-between gap-1 ">
            Partida:
            <b>{departureTime}</b>
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          handleNavigate(id);
        }}
        className="w-full bg-green-900 text-white h-12 rounded-b hover:bg-emerald-800 transition-colors"
      >
        Comprar
      </button>
    </div>
  );
}
