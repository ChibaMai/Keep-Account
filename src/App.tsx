import './App.css'
import routes from '@/router/index'
import { useRoutes } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'

function App() {
  const [enableDarkMode, setEnableDarkMode] = useState(true)
  const [theme, setTheme] = useState('light')
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', (e) => {
    if (!e.matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
    document.documentElement.setAttribute('data-prefers-color-scheme', theme)
  })
  // 路由
  const Views = () => useRoutes(routes)
  return <Views />
}

export default App
