import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface AuthResponse {
  access: string
  refresh: string
}

export interface RefreshResponse {
  access: string
  refresh: string
}

class AuthService {
  private baseURL = API_BASE_URL

  async signIn(initData: string): Promise<AuthResponse> {
    const response = await axios.post(`${this.baseURL}/auth/signin`, {
      initData,
    })
    return response.data
  }

  async refreshTokens(refreshToken: string): Promise<RefreshResponse> {
    const response = await axios.post(`${this.baseURL}/auth/refresh`, {
      refreshToken,
    })
    return response.data
  }

  // Сохранение токенов в localStorage или другом хранилище
  saveTokens(tokens: AuthResponse) {
    console.log(tokens)
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }

  clearTokens() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}

export const authService = new AuthService()
