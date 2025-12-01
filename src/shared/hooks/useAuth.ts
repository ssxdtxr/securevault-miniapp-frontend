import { useState } from 'react'
import { api } from '../api/api'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const signIn = async (initData: string) => {
    const { data } = await api.post<boolean>('/auth/signin', { initData })
    setIsAuth(data)
  }

  return { isAuth, signIn }
}
