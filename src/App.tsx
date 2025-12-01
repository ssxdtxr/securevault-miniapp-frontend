import { useEffect } from 'react'
import './App.css'

// type TelegramUserType = {
//   telegram_id: string
//   username?: string | null
//   name?: string | null
// }

function App() {
  // const { isAuth, signIn } = useAuth()

  useEffect(() => {
    // signIn(window?.Telegram?.WebApp?.initData)
  })

  // if (isAuth) {
  return <h1>{JSON.stringify(window?.Telegram?.WebApp?.initData)}</h1>
  // }
}

export default App
