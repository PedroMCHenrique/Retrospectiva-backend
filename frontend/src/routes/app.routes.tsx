import { Route, Routes } from 'react-router-dom';
import { Cableway } from '../screens/Cableway';
import { Finish } from '../screens/Finish';
import { Home } from '../screens/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/cableway/:id" element={<Cableway />} />
      <Route path="/finish" element={<Finish />} />
    </Routes>
  );
}
