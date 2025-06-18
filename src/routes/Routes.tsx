import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonsByAbilityPage } from '../pages/PokemonsByAbilityPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonsByAbilityPage />} />
      </Routes>
    </BrowserRouter>
  );
}
