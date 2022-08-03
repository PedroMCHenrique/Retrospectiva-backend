import { CablewayList } from '../../components/CablewaysList';
import { Header } from '../../components/Header';

export function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto p-16">
        <CablewayList title="Bondinhos" />
      </div>
    </div>
  );
}
