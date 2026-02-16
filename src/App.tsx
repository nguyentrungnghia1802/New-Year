import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FireworksPage from './pages/FireworksPage';
import LixiPage from './pages/LixiPage';
import FortunePage from './pages/FortunePage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fireworks" element={<FireworksPage />} />
          <Route path="/lixi" element={<LixiPage />} />
          <Route path="/fortune" element={<FortunePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

