import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Menu from './components/Menu'
import Stats from './pages/stats/Stats'
import History from './pages/history/History'
import NotFound from './pages/notFound/NotFound'
import Features from './pages/features/Features'
import Settings from './pages/settings/Settings'
import Onboarding from './pages/onboarding/Onboarding'
import BotManagement from './pages/botManagement/BotManagement'
import FeatureContent from './pages/featureContent/FeatureContent'

import PrivateRoute from './components/PrivateRoute'
import OnboardingRegister from './pages/onboarding/OnboardingRegister'
import LangContextProvider from './components/providers/LangContextProvider'
import ThemeContextProvider from './components/providers/ThemeContextProvider'
import AuthContextProvider from './components/providers/AuthContextProvider'
import OnboardingContextProvider from './components/providers/OnboardingContextProvider'

const App: FC = () => {
  return (
    <ThemeContextProvider>
      <LangContextProvider>
        <OnboardingContextProvider>
          <AuthContextProvider>
            <div className="App">
              <Router>
                <Menu />
                <Routes>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Navigate replace to="/features" />} />
                    <Route path="/features">
                      <Route index element={<Features />} />
                      <Route path="/features/content" element={<FeatureContent />} />
                      <Route path="/features/content/:featureId" element={<FeatureContent />} />
                    </Route>
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/bot-management" element={<BotManagement />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/history" element={<History />} />
                  </Route>

                  <Route path="/onboarding">
                    <Route index element={<Onboarding />} />
                    <Route path="/onboarding/registration" element={<OnboardingRegister />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </div>
          </AuthContextProvider>
        </OnboardingContextProvider>
      </LangContextProvider>
    </ThemeContextProvider>
  )
}
export default App
