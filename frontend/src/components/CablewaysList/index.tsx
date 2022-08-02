import { Cableway } from './Cableway';
import bondinho from '../../assets/bondinho.jpg';
import paoAcucar from '../../assets/pao-de-acucar.webp';
import { useState } from 'react';

const cableways = [
  {
    id: 1,
    name: 'bondinho',
    image: bondinho,
    price: 12,
    seats: 12,
    departure: '03/08/2022 14h',
  },
  {
    id: 2,
    name: 'Pão de Açúcar',
    image: paoAcucar,
    price: 120,
    seats: 12,
    departure: '02/08/2022 14h',
  },
];

export function CablewayList() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(cableways);

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
        <p className="text-4xl font-bold mb-2 text-gray-600">Bondinhos</p>
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
