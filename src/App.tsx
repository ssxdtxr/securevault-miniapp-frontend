import { useEffect } from 'react'
import './App.css'

// type TelegramUserType = {
//   telegram_id: string
//   username?: string | null
//   name?: string | null
// }


function App() {
  const tg = window.Telegram?.WebApp

  // const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    tg?.ready()
  }, [])

  const onClose = () => tg?.close()

  return (
    <div>
      <h1>My Telegram Mini App</h1>
      <button onClick={onClose}>close</button>
      <span>{tg?.initDataUnsafe?.user?.username}</span>
    </div>
  )
}

export default App
