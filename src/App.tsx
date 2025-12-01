import { useEffect, useState } from 'react'
import './App.css'

// type TelegramUserType = {
//   telegram_id: string
//   username?: string | null
//   name?: string | null
// }

function App() {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      // Инициализируем Telegram Web App
      window.Telegram.WebApp.ready()

      // Получаем initData
      const initData = window.Telegram.WebApp.initData

      // Парсим данные пользователя
      const user = parseInitData(initData)
      setUserData(user)
    } else {
      console.error('Telegram Web App is not available')
    }
  }, [])

  const parseInitData = (initData: any) => {
    const params = new URLSearchParams(initData)
    return {
      user: JSON.parse(params?.get('user') ?? ''),
      hash: params.get('hash'),
      auth_date: params.get('auth_date'),
      start_param: params.get('start_param'),
      chat_type: params.get('chat_type'),
      chat_instance: params.get('chat_instance'),
    }
  }

  return (
    <div>
      <h1>My Telegram Mini App</h1>
      {userData ? (
        <div>
          <h2>User Info:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}

export default App
