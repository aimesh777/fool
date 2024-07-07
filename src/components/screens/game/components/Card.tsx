import cn from 'clsx'
import { CSSProperties, FC } from 'react'

import {
	ITypeCard,
	TPositionCard,
	TSizeCard,
	cardSizeToDimensions
} from '@/components/screens/game/game.interface'

import cover from '@/assets/cards/cover.svg'

interface IProps {
	size?: TSizeCard
	position?: TPositionCard
	type?: ITypeCard
	className?: string
	style?: CSSProperties
}

const Card: FC<IProps> = ({
	style,
	className,
	size = 'normal',
	position = 'top',
	type
}) => {
	return (
		<div
			className={cn('overflow-hidden absolute', className)}
			style={{ ...style, borderRadius: cardSizeToDimensions[size].radius }}
		>
			<div
				className='bg-white bg-contain bg-center'
				style={{
					width: cardSizeToDimensions[size].width,
					height: cardSizeToDimensions[size].height,
					backgroundImage: position === 'bottom' && `url(${cover})`
				}}
			>
				{position === 'top' && (
					<div>
						suit: {type?.suit} <br />
						value: {type?.value}
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
