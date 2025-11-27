import { useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMutation } from '@tanstack/react-query'
import { api } from './shared/api/api'

type TelegramUserType = {
  telegram_id: string
  username?: string | null
  name?: string | null
}

function App() {
  const tg = window.Telegram?.WebApp
  const params = useMemo(() => new URLSearchParams(window.location.search), [])

  const username = params.get('username')
  const name = params.get('name')
  const telegram_id = params.get('tg_id') as string

  const {
    mutateAsync: sync,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['sync'],
    mutationFn: async (body: TelegramUserType) => await api.post('/users/sync', body),
  })

  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.requestFullscreen()
    }

    sync({ telegram_id, name, username })
  }, [name, sync, telegram_id, tg, username])

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
        {isPending ? (
          <div>LOADING...</div>
        ) : (
          <p>
            Привет, {username} {telegram_id}
          </p>
        )}

        {isError && isError}
      </h2>
    </>
  )
}

export default App
