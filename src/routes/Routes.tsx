import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PokemonsByTypePage } from '../features/PokemonsByType/PokemonsByType'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonsByTypePage />} />
      </Routes>
    </BrowserRouter>
  )
}
