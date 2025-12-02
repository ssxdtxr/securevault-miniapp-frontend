import { useEffect } from 'react'
import './App.css'
import { useLogout, useSignIn, useUser } from './shared/hooks/useAuth'

function App() {
  const tg = window.Telegram?.WebApp
  const signInMutation = useSignIn()
  const { data: userData, isLoading } = useUser()
  const logout = useLogout()


  useEffect(() => {
    tg?.ready()
    tg?.requestFullscreen()

    // Автоматический вход при загрузке приложения
    const initData = tg?.initData
    const initDataUnsafe = tg?.initDataUnsafe

    if (initData && initDataUnsafe?.user?.id) {
      // Проверяем, есть ли уже токен
      const hasToken = localStorage.getItem('access_token')

      if (!hasToken) {
        // Выполняем вход
        signInMutation.mutate(
          'query_id=AAH3FMIgAAAAAN_sgAg&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%2C%22username%22%3A%22johndoe%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1717020800&hash=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
        )
      }
    }
  }, [tg])

  const onClose = () => tg?.close()

  const handleSignIn = () => {
    const initData = tg?.initData
    if (initData) {
      signInMutation.mutate(
        initData
        // 'query_id=AAH3FMIgAAAAAN_sgAg&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%2C%22username%22%3A%22johndoe%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1717020800&hash=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      )
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>My Telegram Mini App</h1>

      {signInMutation.isPending ? (
        <div>Signing in...</div>
      ) : signInMutation.isError ? (
        <div style={{ color: 'red' }}>Error: {signInMutation.error.message}</div>
      ) : signInMutation.isSuccess ? (
        <div style={{ color: 'green' }}>Successfully signed in!</div>
      ) : null}

      {userData ? (
        <>
          <div>
            <h2>Welcome!</h2>
            <p>User ID: {userData.tg_id}</p>
            <p>Username: {tg?.initDataUnsafe?.user?.username}</p>
            <p>First Name: {tg?.initDataUnsafe?.user?.first_name}</p>
          </div>
          <button onClick={handleLogout} style={{ background: 'red', color: 'white' }}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <p>Not authenticated</p>
          <button onClick={handleSignIn} disabled={!tg?.initData}>
            Sign In with Telegram
          </button>
        </div>
      )}

      <button onClick={onClose} style={{ marginTop: '20px' }}>
        Close App
      </button>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Debug info:</p>
        <p>Has initData: {!!tg?.initData ? 'Yes' : 'No'}</p>
        <p>User ID from TG: {tg?.initDataUnsafe?.user?.id || 'None'}</p>
        <p>Access Token: {localStorage.getItem('access_token') ? 'Present' : 'Missing'}</p>
      </div>
    </div>
  )
}

export default App
