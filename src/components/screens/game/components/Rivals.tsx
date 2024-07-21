import { FC } from 'react'

import { IRival } from '@/components/screens/game/game.interface'
import { Icon, Typography } from '@/components/ui'

import { getGame } from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

interface IProps {
	rivals: IRival[]
	handlerShowModal: (place: number) => void
}

const Rivals: FC<IProps> = ({ rivals, handlerShowModal }) => {
	const game = getGame()
	const countRivals = Array(game.num_players - 1).fill(1)
	/*
	useEffect(() => {
		const newRivalCardsDOM = []

		rivals.forEach((rival, rivalIndex) => {
			newRivalCardsDOM.push([])

			if (rival.numberOfCards > 1) {
				for (let i = 0; i < rival.numberOfCards; i++) {
					newRivalCardsDOM[rivalIndex].push(
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
				newRivalCardsDOM[rivalIndex].push(
					<Card
						size='small'
						position='bottom'
						key={0}
						style={{ rotate: '0deg', zIndex: 20 }}
					/>
				)
			}
		})

		setRivalCardsDOM(newRivalCardsDOM)
	}, [rivals])
*/

	return (
		<div className='flex justify-between w-full'>
			{countRivals.map((item, index) => (
				<button
					key={index}
					onClick={() => handlerShowModal(item + 1)}
					className='w-base-x7 h-base-x7 rounded-base-x1 border border-dashed flex items-center justify-center'
				>
					<Icon size={24} icon='plus' color='white' />
				</button>
			))}
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
						{/*{rivalCardsDOM[rivalIndex]?.length > 0 && rivalCardsDOM[rivalIndex]}*/}
					</div>
				</div>
			))}
		</div>
	)
}

export default Rivals
