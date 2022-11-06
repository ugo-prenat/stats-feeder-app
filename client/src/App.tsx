import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Menu from './components/Menu';
import Stats from './pages/stats/Stats';
import History from './pages/history/History';
import NotFound from './pages/notFound/NotFound';
import Features from './pages/features/Features';
import Settings from './pages/settings/Settings';
import Onboarding from './pages/onboarding/Onboarding';
import FeatureContent from './pages/featureContent/FeatureContent';

const App:React.FC = () => {
  
  return (
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
  )
}
export default App;
