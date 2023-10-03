import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homepage';
import Jogadores from '../pages/jogadores';
import Jogador_Cartas from '../pages/jogador_cartas';
import { AnimatePresence } from 'framer-motion';

export default function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jogadores" element={<Jogadores />} />
          <Route path="/jogador_cartas" element={<Jogador_Cartas />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
