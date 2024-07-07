import { animated, useSpring } from '@react-spring/web'
import { FC, useState } from 'react'

import Card from '@/components/screens/game/components/Card'
import { TPositionCard } from '@/components/screens/game/game.interface'

interface IProps {
	id: any
	onPause: (id) => void
	from: number[]
	to: number[]
	scale: number
	position?: TPositionCard
	animation?: boolean
}

const FlyingCard: FC<IProps> = ({
	id,
	onPause,
	from,
	to,
	scale,
	position,
	animation = false
}) => {
	const [visible, setVisible] = useState<string>('block')
	const springs = useSpring({
		from: { y: from[0], x: from[1] },
		to: { y: to[0], x: to[1] },
		onRest: () => {
			onPause(id)
			setVisible('none')
		}
	})

	return (
		<div
			className={
				scale == 50 ? 'absolute top-0 scale-50' : 'absolute top-0 scale-[78%]'
			}
			style={{ display: visible }}
		>
			<animated.div style={{ ...(springs as any) }}>
				<div
					className={
						animation
							? 'animate-[scalechange_0.75s_ease-in-out] w-[120px] h-[150px] rounded-[12px] bg-white text-[#000]'
							: 'w-[120px] h-[150px] rounded-[12px] bg-white text-[#000]'
					}
				>
					<Card
						type={{
							suit: 'spades',
							value: 6
						}}
						position={position}
					/>
				</div>
			</animated.div>
		</div>
	)
}

export default FlyingCard
