import { createFileRoute, redirect } from '@tanstack/react-router'

const isWelcomeNeeded = false

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    // if (isWelcomeNeeded) {
    //   throw redirect({
    //     to: '/welcome',
    //     replace: true,
    //   })
    // }

    throw redirect({
      to: '/auth',
      replace: true,
    })
  },
  component: () => null,
})
