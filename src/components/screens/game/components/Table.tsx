import { Droppable } from "@hello-pangea/dnd";
import cn from "clsx";
import { FC } from "react";

import { ITypeCard } from "@/components/screens/game/game.interface";

import Card from "./Card";

interface ITable {
	cardsOnTable: ITypeCard[][]
}

const Table: FC<ITable> = ({ cardsOnTable }) => {
	return (
		<div className='flex flex-wrap items-center p-0 gap-base-[3px] gap-1 justify-center my-auto scale-[77%]'>
			{cardsOnTable.map((cardPlace, index) => (
				<Droppable key={index} droppableId={`droppable-table-card-${index}`}>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={cn(
								'border border-dashed transition-colors w-[100px] h-[140px] rounded-[16px] flex items-center justify-center origin-bottom-left',
								cardPlace[0] ? '-rotate-12' : 'rotate-12'
							)}
							style={{
								borderColor: cardPlace[1]
									? 'transparent'
									: snapshot.isDraggingOver
									? '#00EF26'
									: 'white',
								backgroundColor: cardPlace[1]
									? 'transparent'
									: snapshot.isDraggingOver
									? '#ffffff30'
									: 'transparent'
							}}
						>
							<div id={'floating-card-magnet' + index}></div>
							{cardPlace[0] && (
								<Card
									className={cn('rotate-12 ', cardPlace[1] && 'brightness-75')}
									type={{
										suit: cardPlace[0].suit,
										value: cardPlace[0].value
									}}
								/>
							)}
							{cardPlace[1] && (
								<Card
									className='-rotate-0'
									type={{
										suit: cardPlace[1].suit,
										value: cardPlace[1].value
									}}
								/>
							)}
						</div>
					)}
				</Droppable>
			))}
		</div>
	)
}

export default Table
