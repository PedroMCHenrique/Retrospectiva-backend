import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import paoAcucar from '../../assets/pao-de-acucar.webp';
import styles from './styles.module.css';
import { CablewayList } from '../../components/CablewaysList';
import { useRef, useState } from 'react';

interface ICableway {
  id: number;
  name: string;
  priceUnity: string;
  price: number;
  seats: number;
  image: string;
  departureTime: string;
}

export function Cableway() {
  var { id } = useParams();
  const navigate = useNavigate();
  const [cableway, setCableway] = useState<ICableway>({} as ICableway);
  const [quantity, setQuantity] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto p-16">
        <div className="shadow-[0_0_36px_rgba(0,0,0,0.3)] w-full flex rounded">
          <img
            className="object-cover h-80 rounded-l max-w-[400px] "
            src={paoAcucar}
            alt=""
          />
          <div className="w-full flex items-center justify-between">
            <div className="p-12 flex flex-col">
              <div>
                <p className="text-4xl font-bold text-gray-600 max-w-[250px]">
                  Pão de açúcar
                </p>
                <p className="text-2xl font-bold mb-2 text-orange-300">
                  <small className="text-sm">
                    <b>Unidade:</b> R$ 103,00
                  </small>
                </p>
              </div>
              <div className=" text-green mt-12">
                <p className="flex items-center gap-1">
                  <b>Lugares disponíveis:</b> 40
                </p>
                <p className="flex items-center gap-1 ">
                  <b>Partida:</b> 03/08/2022 16h
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 items-center">
                Quantidade
                <div className="flex">
                  <button
                    className="w-12 h-12 bg-green rounded-full text-white text-2xl"
                  >
                    -
                  </button>
                  <input
                    className="text-center bg-gray-100 mx-2 rounded"
                    type="number"
                    disabled
                    value={quantity}
                  />
                  <button
                    className="w-12 h-12 bg-green rounded-full text-white text-2xl"
                  >
                    +
                  </button>
                </div>
                <p className="flex flex-1 flex-col mt-4 gap-1 ">
                  <span className="text-emerald-700 text-sm">
                    <b>assentos disponíveis:</b> 40
                  </span>
                  <span className="text-red-400 text-center text-md">
                    <b>R$ 103.00</b>
                  </span>
                </p>
              </div>
            </div>
            <Link to='/finish' className={styles.button}>
              Finalizar compra
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-green my-16"></div>
        <CablewayList title="Relacionados" />
      </div>
    </div>
  );
}
