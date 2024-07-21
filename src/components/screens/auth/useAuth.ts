import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useMemo } from 'react'

import { IPlayer } from '@/shared/types/auth.interface'

import { AuthService } from '@/services/auth/auth.service'

import { playerAtom } from '@/store'

export const useAuth = id => {
	// const navigate = useNavigate()
	const setPlayer = useSetAtom(playerAtom)

	const { data: player, isLoading: isPlayerLoading } = useQuery(
		['getPlayer', id],
		() => (id ? AuthService.getPlayer(id) : Promise.resolve(null)),
		{
			enabled: !!id,
			onSuccess: (data: IPlayer) => {
				console.log('Player data:', data)
				setPlayer(data)
				// navigate(0)
			}
		}
	)
	return useMemo(
		() => ({
			player,
			isPlayerLoading
		}),
		[isPlayerLoading]
	)
}
