import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonDetailPage } from '../pages/PokemonDetailPage';
import { PokemonsByAbilityPage } from '../pages/PokemonsByAbilityPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonsByAbilityPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
