import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ICreateGameRequest } from '@/shared/types/game.interface'

import { saveGame } from '@/services/game/game.helper'
import { GameService } from '@/services/game/game.service'

import { playerAtom } from '@/store'

export const useCreateGame = (bet, currency) => {
	const navigate = useNavigate()
	const player = useAtomValue(playerAtom)

	const { mutate: createGame, isLoading: isCreateGameLoading } = useMutation(
		['createGame'],
		(info: ICreateGameRequest) =>
			GameService.createGame({ info: info, tg_id: player.tg_id }),
		{
			onSuccess: data => {
				saveGame(data)
				navigate('/game')
			}
		}
	)

	return useMemo(
		() => ({
			createGame,
			isCreateGameLoading
		}),
		[isCreateGameLoading]
	)
}
