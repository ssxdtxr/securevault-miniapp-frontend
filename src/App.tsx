import { useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const tg = window.Telegram?.WebApp
  const params = useMemo(() => new URLSearchParams(window.location.search), [])

  useEffect(() => {
    if (tg) {
      tg.expand()
      tg.ready()
    }
  }, [tg])

  const username = params.get('username')
  const id = params.get('tg_id')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>
        Привет, {username} {id}
      </h2>
    </>
  )
}

export default App
