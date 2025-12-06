import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import Logo from '../shared/assets/logo.svg?react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
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
  )
}
