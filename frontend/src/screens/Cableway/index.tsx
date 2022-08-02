import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import paoAcucar from '../../assets/pao-de-acucar.webp';
import styles from './styles.module.css';
import { CablewayList } from '../../components/CablewaysList';

export function Cableway() {
  var { id } = useParams();

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto p-16">
        <div className="shadow-[0_0_36px_rgba(0,0,0,0.3)] w-full flex rounded items-center">
          <img className="object-cover h-80 rounded-l" src={paoAcucar} alt="" />
          <div className="p-12 flex flex-col">
            <div>
              <p className="text-4xl font-bold text-gray-600">Pão de Açúcar</p>
              <p className="text-2xl font-bold mb-2 text-orange-300">
                <b>R$</b> 210,00
              </p>
            </div>
            <div className=" text-green mt-12">
              <p className="flex items-center gap-1">
                <b>Lugares disponíveis:</b> seats
              </p>
              <p className="flex items-center gap-1 ">
                <b>Partida:</b> departure
              </p>
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex flex-col flex-1 items-center">
              Quantidade
              <div className="flex">
                <button className="w-12 h-12 bg-green rounded-full text-white text-2xl">
                  -
                </button>
                <input
                  className="text-center bg-gray-100 mx-2 rounded"
                  type="text"
                  value="1"
                  disabled
                />
                <button className="w-12 h-12 bg-green rounded-full text-white text-2xl">
                  +
                </button>
              </div>
              <p className="flex flex-1 items-center mt-12 gap-1 text-2xl text-emerald-700">
                <b>Total:</b> seats
              </p>
            </div>
          </div>
          <Link to="/finish" className={styles.button}>
            Finalizar compra
          </Link>
        </div>

        <div className="w-full h-px bg-green my-16"></div>
        <div>
          <p className="text-4xl font-bold mb-4 text-gray-600">Relacionados</p>
          <CablewayList />
        </div>
      </div>
    </div>
  );
}
