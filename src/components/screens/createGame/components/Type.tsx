import cn from 'clsx'
import { FC } from 'react'

import { Typography } from '@/components/ui'

import { TTypeGame } from '@/shared/types'

interface IProps {
	selectedType: TTypeGame
	setSelectedType: (value: TTypeGame) => void
}

const Type: FC<IProps> = ({ selectedType, setSelectedType }) => {
	const types: { name: TTypeGame; title: string }[] = [
		{
			name: 'thrown-up',
			title: 'Подкидной'
		},
		{
			name: 'transferable',
			title: 'Переводной'
		}
	]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Тип игры</Typography>
			<div className='grid grid-rows-1 grid-cols-2 gap-base-x6 w-full'>
				{types.map(item => (
					<button
						onClick={() => setSelectedType(item.name)}
						key={item.name}
						className={cn(
							'flex gap-base-x2 items-center rounded-base-x1 py-base-x1 px-base-x3 w-full border border-white',
							selectedType === item.name
								? 'border-solid bg-radial-gradient bg-gradient'
								: 'border-dashed'
						)}
					>
						<Typography variant='text'>{item.title}</Typography>
					</button>
				))}
			</div>
		</div>
	)
}

export default Type
