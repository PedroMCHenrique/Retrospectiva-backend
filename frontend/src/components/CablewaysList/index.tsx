import { Cableway } from './Cableway';
import bondinho from '../../assets/bondinho.jpg';
import paoAcucar from '../../assets/pao-de-acucar.webp';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const cableways = [
  {
    id: 1,
    name: 'bondinho',
    image: bondinho,
    price: 12,
    seats: 12,
    departureTime: '03/08/2022 14h',
  },
  {
    id: 2,
    name: 'Pão de Açúcar',
    image: paoAcucar,
    price: 120,
    seats: 12,
    departureTime: '02/08/2022 14h',
  },
];
interface CablewayListProps {
  title: string;
}
interface ICableway {
  id: number;
  name: string;
  price: string;
  seats: number;
  image: string;
  departureTime: string;
}
export function CablewayList({ title }: CablewayListProps) {
  const [cableways, setCableways] = useState<ICableway[]>(
    [] as Array<ICableway>
  );
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<ICableway[]>([] as Array<ICableway>);

  useEffect(() => {
    async function getCableways() {
      const { data } = await api.get<ICableway[]>('/cableway');
      const cablewaysFormatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        price: `R$ ${item.price}`,
        seats: item.seats,
        image: item.image,
        departureTime: new Date(item.departureTime).toLocaleString('pt-BR', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
      setCableways(cablewaysFormatted);
      setFiltered(cablewaysFormatted);
    }

    getCableways();
  }, []);

  function handleSearch(search: string) {
    const filterValue = search.toLowerCase();

    const filtered = cableways.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
    setFiltered(filtered);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:flex-col md:flex-row">
        <p className="text-4xl font-bold mb-2 text-gray-600">{title}</p>
        <input
          type="search"
          className="bg-gray-100 p-3 md:w-64 rounded sm:w-full"
          placeholder="Pesquisar por nome"
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={search}
        />
      </div>
      <div style={styles.grid}>
        {filtered.length ? (
          filtered.map((cableway) => (
            <Cableway key={cableway.id} cableway={cableway} />
          ))
        ) : (
          <h4>Nenhum bondinho encontrado</h4>
        )}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, auto))',
    gridGap: '3rem',
  },
};
