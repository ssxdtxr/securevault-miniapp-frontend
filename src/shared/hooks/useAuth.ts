// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../api/services/auth'

export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (initData: string) => authService.signIn(initData),
    onSuccess: data => {
      // Сохраняем токены
      authService.saveTokens(data.tokens)

      // Обновляем кеш пользователя
      queryClient.setQueryData(['user'], data.user)
      queryClient.setQueryData(['tokens'], data.tokens)

      // Делаем запросы валидными
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: error => {
      console.error('Sign in error:', error)
      authService.clearTokens()
    },
  })
}

export function useRefreshTokens() {
  return useMutation({
    mutationFn: (refreshToken: string) => authService.refreshTokens(refreshToken),
    onSuccess: data => {
      authService.saveTokens(data)
    },
    onError: () => {
      authService.clearTokens()
    },
  })
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const accessToken = authService.getAccessToken()
      if (!accessToken) {
        throw new Error('No access token')
      }
      // Здесь можно сделать запрос для получения данных пользователя
      return { tg_id: 0 } // Замените на реальный запрос
    },
    enabled: !!authService.getAccessToken(),
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    authService.clearTokens()
    queryClient.clear()
    queryClient.removeQueries()
  }
}
