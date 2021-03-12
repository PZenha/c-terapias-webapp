import { ITokens } from '../types'

export const saveTokens = (tokens: ITokens) => {
	const { accessToken, refreshToken } = tokens
	localStorage.setItem('accessToken', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessToken = () => {
	return localStorage.getItem('accessToken') || ''
}

export const getRefreshToken = () => {
	return localStorage.getItem('refreshToken') || ''
}

export const getTokens = () => {
	return {
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: localStorage.getItem('refreshToken') || ''
	}
}

export const resetStore = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
}