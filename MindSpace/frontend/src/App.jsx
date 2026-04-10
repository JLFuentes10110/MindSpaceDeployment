import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'
import MoodTrackerPage from './pages/MoodTrackerPage'
import BreathingExercisePage from './pages/BreathingExercisePage'
import ReflectionPage from './pages/ReflectionPage'
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import { clearAuthToken, getAuthToken, setAuthToken } from './utils/api'

function App() {
  const [activePage, setActivePage] = useState(() => {
    const token = getAuthToken()
    return token ? 'chat' : 'landing'
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [token, setToken] = useState(() => getAuthToken())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSignIn = (newToken) => {
    setToken(newToken)
    setAuthToken(newToken)
    setActivePage('chat')
  }

  const handleSignOut = () => {
    setToken(null)
    clearAuthToken()
    setActivePage('landing')
  }

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage onNavigate={setActivePage} />
      case 'signin':
        return <SignInPage onNavigate={setActivePage} onSignIn={handleSignIn} />
      case 'chat':
        return <ChatPage onUnauthorized={handleSignOut} />
      case 'mood':
        return <MoodTrackerPage onUnauthorized={handleSignOut} />
      case 'breathing':
        return <BreathingExercisePage />
      case 'reflection':
        return <ReflectionPage onUnauthorized={handleSignOut} />
      default:
        return <LandingPage onNavigate={setActivePage} />
    }
  }

  const isAuthenticated = Boolean(token)

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {(activePage === 'landing' || activePage === 'signin') ? (
        renderPage()
      ) : (
        <div className="flex h-screen bg-wellness-gray dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-sans text-wellness-text dark:text-gray-100">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onSignOut={handleSignOut}
          />
          <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-wellness-blue to-transparent dark:from-blue-900/20 dark:to-transparent opacity-50 pointer-events-none -z-10 transition-colors duration-300" />
            {renderPage()}
          </main>
        </div>
      )}
    </div>
  )
}

export default App