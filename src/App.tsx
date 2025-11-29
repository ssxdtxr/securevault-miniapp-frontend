import { useEffect, useMemo, useState } from 'react'
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
  const telegram_id = params.get('tg_id')

  const {
    mutateAsync: sync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ['sync'],
    mutationFn: async (body: TelegramUserType) => await api.post('/users/sync', body),
  })

  const [hasSynced, setHasSynced] = useState(false)

  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.requestFullscreen()
    }

    if (telegram_id && !hasSynced) {
      sync({
        telegram_id,
        name: name ?? null,
        username: username ?? null,
      }).finally(() => {
        setHasSynced(true)
      })
    }
  }, [tg, telegram_id, name, username, sync, hasSynced])

  if (!telegram_id) {
    return <div>Ошибка: не найден tg_id в URL</div>
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>
        {isPending ? (
          <div>Загрузка...</div>
        ) : isError ? (
          <div>Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</div>
        ) : (
          <p>
            Привет, {username || 'друг'} (ID: {telegram_id})
          </p>
        )}
      </h2>
    </>
  )
}

export default App
