import { useQuery } from '@tanstack/react-query'

import { getId } from '@/services/auth/auth.helper'
import { FriendsService } from '@/services/friends.service'
import { getGame } from '@/services/game/game.helper'

export const useGame = () => {
	const tg_id = getId()
	const game = getGame()

	const { data: rivals, isLoading: isRivalsLoading } = useQuery(
		['rivals'],
		() => FriendsService.getFriendsOnline(tg_id, game.bet, game.currency),
		{
			enabled: !!game.bet && !!game.currency && !!tg_id
		}
	)

	return {
		rivals,
		isRivalsLoading
	}
}
