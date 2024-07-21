import { ICreateGameRequest, IGame } from '@/shared/types/game.interface'

import { request } from '@/services/api/request.api'

import { API_URL } from '@/config/api.config'

export const GameService = {
	async createGame({
		info,
		tg_id
	}: {
		info: ICreateGameRequest
		tg_id: number
	}) {
		return request<IGame>({
			baseURL: API_URL,
			url: `/create-game/${tg_id}`,
			method: 'POST',
			data: { ...info }
		})
	}
}
