import { FC, useEffect, useState } from 'react'

import { IRival } from '@/components/screens/game/game.interface'
import { Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

import Card from './Card'

interface IProps {
	rivals: IRival[]
}

const Rivals: FC<IProps> = ({ rivals }) => {
	const [rivalCards, setRivalCards] = useState([])

	useEffect(() => {
		const maxRivalCardsAngleDegrees = 30
		const newRivalCards = []

		rivals.forEach((rival, rivalIndex) => {
			newRivalCards.push([])

			if (rival.numberOfCards > 1) {
				for (let i = 0; i < rival.numberOfCards; i++) {
					newRivalCards[rivalIndex].push(
						<Card
							size='small'
							position='bottom'
							key={i}
							className={`card-index-${i}`}
							style={{
								rotate: `${
									(90 / rival.numberOfCards) * i - maxRivalCardsAngleDegrees
								}deg`,
								transformOrigin: 'center 10px',
								zIndex: 20 + i
							}}
						/>
					)
				}
			} else if (rival.numberOfCards > 0) {
				newRivalCards[rivalIndex].push(
					<Card
						size='small'
						position='bottom'
						key={0}
						style={{ rotate: '0deg', zIndex: 20 }}
					/>
				)
			}
		})

		setRivalCards(newRivalCards)
	}, [rivals])

	return (
		<div className='flex justify-between w-full'>
			{rivals.map((rival, rivalIndex) => (
				<div
					className='flex flex-col items-center gap-base-x1 relative'
					key={rival.name}
				>
					<Typography variant='text'>{rival.name}</Typography>
					<div className='relative z-30'>
						<img
							src={avatar}
							alt=''
							className='w-base-x7 h-base-x7 rounded-base-x1'
						/>
					</div>
					<div
						id={'Cards' + rivalIndex}
						className='w-full absolute top-[50px] left-[20px] z-20'
					>
						{rivalCards[rivalIndex]?.length > 0 && rivalCards[rivalIndex]}
					</div>
				</div>
			))}
		</div>
	)
}

export default Rivals
