import { useAuth } from './shared/hooks/useAuth'
import { Button } from './shared/ui/Button'
import { Input } from './shared/ui/Input'

import Logo from './shared/assets/logo.svg?react'

function App() {
  // const { mutateSignIn } = useAuth()

  return (
    <main className="w-screen h-screen overflow-hidden p-4 flex items-center justify-center">
      <section className="flex flex-col gap-5 w-full">
        <div className="flex flex-col justify-center items-center">
          <Logo className="w-[104px] h-30" />
          <span className="text-3xl font-bold">Secure Vault</span>
        </div>

        <div className="flex flex-col gap-3">
          <Input placeholder="Почта" />
          <Input placeholder="Пароль" />
        </div>
        <div className="flex flex-col gap-3">
          <Button>Войти</Button>
          <Button variant="outlined">Создать аккаунт</Button>
        </div>
      </section>
    </main>
  )
}

export default App
