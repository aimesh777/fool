import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useMemo } from 'react'

import { IPlayer } from '@/shared/types/auth.interface'

import { getId } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

import { playerAtom } from '@/store'

export const useProfile = () => {
	const tg_id = getId()
	const setPlayer = useSetAtom(playerAtom)

	const { data: user, isLoading: isUserLoading } = useQuery(
		['getPlayer'],
		() => AuthService.getPlayer(tg_id),
		{
			onSuccess: (data: IPlayer) => {
				setPlayer(data)
			}
		}
	)

	return useMemo(
		() => ({
			user,
			isUserLoading
		}),
		[isUserLoading]
	)
}
