import { animated } from "@react-spring/web";
import { FC } from "react";

import { ITypeCard } from "@/components/screens/game/game.interface";

interface IProps {
	type: ITypeCard
	num: number
	total: number
	snapshot?: any
	provided?: any
}

const DraggableCard: FC<IProps> = ({
	type,
	num,
	total,
	snapshot,
	provided
}) => {
	const angleOffset = 2

	return (
		<div
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
		>
			<animated.div
				ref={provided.innerRef}
				style={{
					transform: !snapshot.isDragging
						? `rotate(${
								(num - (total - 1) / 2) * angleOffset
						  }deg) translateX(-60px) scale(1.1)`
						: `rotate(${
								((num - (total - 1) / 2) * angleOffset) / 2
						  }deg) translateX(-60px) scale(1.2)`,
					transformOrigin: '0% 100%'
				}}
				className='transition ease-in delay-[10] overflow-hidden rounded-[12px] shadow-2xl absolute pb-0 hover:!-translate-y-[65px] hover:!-translate-x-[55px] duration-[1500]'
			>
				<div className='w-[120px] h-[150px] bg-white text-[#000]'>
					Suit: {type.suit}
					Value: {type.value}
				</div>
			</animated.div>
		</div>
	)
}

export default DraggableCard
