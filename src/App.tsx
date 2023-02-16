import './App.css'
import routes from '@/router/index'
import { useRoutes } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
  const [enableDarkMode, setEnableDarkMode] = useState(true)
  const [theme, setTheme] = useState('light')
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', (e) => {
    if (!e.matches) {
      setTheme('dark')
      // localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      // localStorage.setItem('theme', 'light')
    }
    document.documentElement.setAttribute('data-prefers-color-scheme', theme)
  })

  useEffect(() => {
    // 获取本地主题是否为 null
    // const darkModeNeverActivatedByAction = localStorage.getItem('theme') === null
    // // 判断本地主题是否为 null 不 null 则获取主题返回 false : true
    // const darkModeActivated = darkModeNeverActivatedByAction || localStorage.getItem('theme')
    // // 获取当前浏览器主题
    // const preferredThemeOs = window.matchMedia('(prefers-color-scheme: dark)').matches
    // //  获取是否自动更换主题  如果本地存储有状态则不获取当前浏览器主题
    // const preferredTheme = darkModeActivated || (darkModeNeverActivatedByAction && preferredThemeOs)

    // const themes = preferredTheme ? 'dark' : 'light'
    
    document.documentElement.setAttribute('data-prefers-color-scheme', mediaQuery.matches ? 'dark' : 'light')
    // 存储到本地
    // localStorage.setItem('theme', theme)
  })

  // 路由
  const Views = () => useRoutes(routes)
  return <Views />
}

export default App
