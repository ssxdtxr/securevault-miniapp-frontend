import { useNavigate } from '@tanstack/react-router'
import NotFoundIcon from '../../shared/assets/404.svg?react'
import { Button } from '../../shared/ui/Button'

export const NotFound = () => {
  const navigate = useNavigate()

  const onNavigate = () =>
    navigate({
      to: '/',
      replace: true,
    })

  return (
    <section className="w-screen h-screen flex flex-col gap-5 items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <NotFoundIcon />
        <span className="text-3xl font-bold">Страница не найдена</span>
      </div>
      <Button onClick={onNavigate}>Вернуться на главную</Button>
    </section>
  )
}
