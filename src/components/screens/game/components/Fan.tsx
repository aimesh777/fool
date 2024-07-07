import { Draggable, Droppable } from '@hello-pangea/dnd'
import { FC } from 'react'

import { ITypeCard } from '@/components/screens/game/game.interface'
import { Button } from '@/components/ui'

import avatar from '@/assets/tapps.png'

import DraggableCard from './DraggableCard'

interface IProps {
	cards: ITypeCard[]
	ready: any
}

const Fan: FC<IProps> = ({ cards, ready }) => {
	return (
		<div className='relative w-full'>
			<div className='relative bottom-[140px] flex justify-between'>
				<img
					src={avatar}
					alt=''
					className='w-base-x7 h-base-x7 rounded-base-x1'
				/>
				<Button
					className='rounded-full border border-white'
					style={{
						width: 64,
						height: 64
					}}
					onClick={ready}
				>
					Готов
				</Button>
			</div>
			<div className='absolute bottom-[100px] left-[50%] flex flex-row items-center justify-center'>
				{cards.map((card, index) => (
					<Droppable key={index} droppableId={`droppable-card-${index}`}>
						{(provided, _) => (
							<div
								style={{
									position: 'absolute',
									zIndex: index + 1,
									left: `${
										(index - cards.length / 2) * ((40 * 6) / cards.length)
									}px `
								}}
							>
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<Draggable index={index} draggableId={'draggable-' + index}>
										{(provided, snapshot) => (
											<DraggableCard
												type={card}
												num={index}
												provided={provided}
												snapshot={snapshot}
												total={cards.length}
											/>
										)}
									</Draggable>
								</div>
							</div>
						)}
					</Droppable>
				))}
			</div>
		</div>
	)
}

export default Fan
