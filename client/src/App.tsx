import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Menu from './components/Menu';
import Stats from './pages/stats/Stats';
import History from './pages/history/History';
import NotFound from './pages/notFound/NotFound';
import Features from './pages/features/Features';
import Settings from './pages/settings/Settings';
import Onboarding from './pages/onboarding/Onboarding';
import FeatureContent from './pages/featureContent/FeatureContent';
import { defaultTheme, ThemeContext } from './components/ThemeContext';


const App: FC = () => {
  const [theme, setTheme] = useState<'light'|'dark'>(defaultTheme);
  
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setTheme(colorScheme);
      });
  }, []);
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App">
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<Navigate replace to="/features" />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/features">
              <Route index element={<Features />} />
              <Route path="/features/content" element={<FeatureContent />} />
              <Route path="/features/content/:featureId" element={<FeatureContent />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}
export default App;
