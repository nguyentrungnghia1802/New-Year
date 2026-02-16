import { useEffect } from 'react';

const FireworksPage = () => {
  useEffect(() => {
    // Redirect to standalone fireworks page
    window.location.href = '/fireworks.html';
  }, []);

  return null;
};

export default FireworksPage;
