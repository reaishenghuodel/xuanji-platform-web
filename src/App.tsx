import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

// Eager load landing page (first impression) and layout
import LandingPage from './pages/LandingPage'

// Lazy load all app pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BrandMonitor = lazy(() => import('./pages/BrandMonitor'))
const KeywordTool = lazy(() => import('./pages/KeywordTool'))
const ContentCreate = lazy(() => import('./pages/ContentCreate'))
const MaterialLibrary = lazy(() => import('./pages/MaterialLibrary'))
const Report = lazy(() => import('./pages/Report'))
const RankingPage = lazy(() => import('./pages/RankingPage'))
const CasePage = lazy(() => import('./pages/CasePage'))
const Settings = lazy(() => import('./pages/Settings'))
const CitationsPage = lazy(() => import('./pages/CitationsPage'))
const PromptCoverage = lazy(() => import('./pages/PromptCoverage'))
const StrategyPage = lazy(() => import('./pages/StrategyPage'))

const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'))
const AlertsPage = lazy(() => import('./pages/AlertsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const DiagnosisPage = lazy(() => import('./pages/DiagnosisPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-full" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>页面加载中...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/diagnosis" element={
              <Suspense fallback={<PageLoader />}>
                <DiagnosisPage />
              </Suspense>
            } />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="dashboard" element={
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="strategy" element={
                <Suspense fallback={<PageLoader />}>
                  <StrategyPage />
                </Suspense>
              } />
              <Route path="knowledge" element={
                <Suspense fallback={<PageLoader />}>
                  <KnowledgeBase />
                </Suspense>
              } />
              <Route path="alerts" element={
                <Suspense fallback={<PageLoader />}>
                  <AlertsPage />
                </Suspense>
              } />
              <Route path="monitor" element={
                <Suspense fallback={<PageLoader />}>
                  <BrandMonitor />
                </Suspense>
              } />
              <Route path="keywords" element={
                <Suspense fallback={<PageLoader />}>
                  <KeywordTool />
                </Suspense>
              } />
              <Route path="content" element={
                <Suspense fallback={<PageLoader />}>
                  <ContentCreate />
                </Suspense>
              } />
              <Route path="materials" element={
                <Suspense fallback={<PageLoader />}>
                  <MaterialLibrary />
                </Suspense>
              } />
              <Route path="reports" element={
                <Suspense fallback={<PageLoader />}>
                  <Report />
                </Suspense>
              } />
              <Route path="ranking" element={
                <Suspense fallback={<PageLoader />}>
                  <RankingPage />
                </Suspense>
              } />
              <Route path="cases" element={
                <Suspense fallback={<PageLoader />}>
                  <CasePage />
                </Suspense>
              } />
              <Route path="citations" element={
                <Suspense fallback={<PageLoader />}>
                  <CitationsPage />
                </Suspense>
              } />
              <Route path="prompts" element={
                <Suspense fallback={<PageLoader />}>
                  <PromptCoverage />
                </Suspense>
              } />
              <Route path="settings" element={
                <Suspense fallback={<PageLoader />}>
                  <Settings />
                </Suspense>
              } />
            </Route>
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            } />
          </Routes>
        </HashRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
