import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import HomePage from './pages/HomePage';
import FireworksPage from './pages/FireworksPage';
import LixiPage from './pages/LixiPage';
import FortunePage from './pages/FortunePage';
import AudioControl from './components/AudioControl';
import './index.css';

function App() {
  return (
    <Router>
      <AudioProvider>
        <div className="min-h-screen w-full overflow-x-hidden">
          <AudioControl />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fireworks" element={<FireworksPage />} />
            <Route path="/lixi" element={<LixiPage />} />
            <Route path="/fortune" element={<FortunePage />} />
          </Routes>
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;

