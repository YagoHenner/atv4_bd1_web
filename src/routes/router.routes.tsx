import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homepage';
import { AnimatePresence } from 'framer-motion';

export default function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
