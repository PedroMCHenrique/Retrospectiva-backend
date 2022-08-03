import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import styles from './styles.module.css';
import { CablewayList } from '../../components/CablewaysList';
import { api } from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    async function getCableways() {
      const { data } = await api.get<ICableway>(`/cableway/${id}`);

      const formatted = {
        id: data.id,
        name: data.name,
        priceUnity: `R$ ${data.price}`,
        price: data.price,
        seats: data.seats,
        image: data.image,
        departureTime: new Date(data.departureTime).toLocaleString('pt-BR', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setCableway(formatted);
    }

    getCableways();
  }, [id]);

  function handleChangeQuantity(type: string) {
    if (type === 'increase') {
      if (cableway.seats === quantity) return;
      setQuantity((currentValue) => currentValue + 1);
    } else {
      if (quantity === 1) return;
      setQuantity((currentValue) => currentValue - 1);
    }
  }

  async function handleBuyTicket() {
    try {
      await api.post(`/buyticket/${id}`, { quantity });
      navigate('/finish');
    } catch (error) {
      toast.warning(
        'Ocorreu algum erro ao concluir sua compra, por favor tente mais tarde.'
      );
    }
  }

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto p-16">
        <div className="shadow-[0_0_36px_rgba(0,0,0,0.3)] w-full flex rounded">
          <img
            className="object-cover h-80 rounded-l max-w-[400px] "
            src={cableway.image}
            alt=""
          />
          <div className="w-full flex items-center justify-between">
            <div className="p-12 flex flex-col">
              <div>
                <p className="text-4xl font-bold text-gray-600 max-w-[250px]">
                  {cableway.name}
                </p>
                <p className="text-2xl font-bold mb-2 text-orange-300">
                  <small className="text-sm">
                    <b>Unidade:</b> {cableway.priceUnity}
                  </small>
                </p>
              </div>
              <div className=" text-green mt-12">
                <p className="flex items-center gap-1">
                  <b>Lugares disponíveis:</b> {cableway.seats}
                </p>
                <p className="flex items-center gap-1 ">
                  <b>Partida:</b> {cableway.departureTime}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 items-center">
                Quantidade
                <div className="flex">
                  <button
                    onClick={() => handleChangeQuantity('decrease')}
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
                    onClick={() => handleChangeQuantity('increase')}
                    className="w-12 h-12 bg-green rounded-full text-white text-2xl"
                  >
                    +
                  </button>
                </div>
                <p className="flex flex-1 flex-col mt-4 gap-1 ">
                  <span className="text-emerald-700 text-sm">
                    <b>assentos disponíveis:</b> {cableway.seats}
                  </span>
                  <span className="text-red-400 text-center text-md">
                    <b>R$ {(cableway.price * quantity).toFixed(2)}</b>
                  </span>
                </p>
              </div>
            </div>
            <button onClick={handleBuyTicket} className={styles.button}>
              Finalizar compra
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-green my-16"></div>
        <CablewayList title="Relacionados" />
      </div>
    </div>
  );
}
