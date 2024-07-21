import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout } from '@/components/ui'

import { IPlayer } from '@/shared/types/auth.interface'
import {
	ICreateGameRequest,
	TCurrency,
	TTypeGame
} from '@/shared/types/game.interface'

import { useProfile } from '@/hooks'

import { Bet, Currency, Rivals, Type } from './components'
import { useCreateGame } from './useCreateGame'

const CreateGame: FC = () => {
	const navigate = useNavigate()
	const { user } = useProfile()
	const [info, setInfo] = useState<ICreateGameRequest>({
		currency: 'foolcoin',
		bet: 7,
		num_players: 1,
		game_type: 'flip_up'
	})
	const { createGame } = useCreateGame(info.bet, info.currency)
	const [selectedRivals, setSelectedRivals] = useState<IPlayer[]>([])
	const onSubmit = () => {
		const updatedInfo = { ...info, num_players: info.num_players + 1 }
		createGame(updatedInfo)
	}

	const updateInfo = <K extends keyof ICreateGameRequest>(
		key: K,
		value: ICreateGameRequest[K]
	) => {
		setInfo(prevInfo => ({
			...prevInfo,
			[key]: value
		}))
	}

	return (
		<Layout
			header={{
				icon: 'fan',
				title: 'Новая игра'
			}}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button onClick={onSubmit}>Играть</Button>
					<Button
						onClick={() => navigate('/menu')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
			className='flex flex-col gap-base-x2'
		>
			<Currency
				setSelectedCurrency={(value: TCurrency) =>
					updateInfo('currency', value)
				}
				currency={user?.currency}
				selectedCurrency={info.currency}
			/>
			<Bet
				setSelectedBet={(value: number) => updateInfo('bet', value)}
				selectedBet={info.bet}
				currentBalance={user?.currency[info.currency]}
				selectedCurrency={info.currency}
			/>
			<Type
				selectedType={info.game_type}
				setSelectedType={(value: TTypeGame) => updateInfo('game_type', value)}
			/>
			<Rivals
				selectedRivals={selectedRivals}
				selectedCountRivals={info.num_players}
				setSelectedRivals={setSelectedRivals}
				setSelectedCountRivals={(value: number) =>
					updateInfo('num_players', value)
				}
			/>
		</Layout>
	)
}

export default CreateGame
