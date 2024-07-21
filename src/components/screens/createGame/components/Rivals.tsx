import cn from 'clsx'
import { FC } from 'react'

import { Typography } from '@/components/ui'

import { IPlayer } from '@/shared/types/auth.interface'

interface IProps {
	selectedRivals: IPlayer[]
	selectedCountRivals: number
	setSelectedRivals: (value: IPlayer[]) => void
	setSelectedCountRivals: (value: number) => void
}

const Rivals: FC<IProps> = ({
	selectedRivals,
	setSelectedRivals,
	selectedCountRivals,
	setSelectedCountRivals
}) => {
	const countRivals = [1, 2, 3]
	const handleRemoveRival = rivalToRemove => {
		setSelectedRivals(selectedRivals.filter(rival => rival !== rivalToRemove))
	}

	const changeCountRivals = item => {
		if (selectedRivals.length === 0) {
			setSelectedCountRivals(item)
		}
	}

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<div className='flex flex-col items-center gap-base-x2 w-full'>
				<Typography variant='text'>Количество соперников</Typography>
				<div className='flex justify-between w-full gap-base-x5'>
					{countRivals.map(item => (
						<button
							onClick={() => setSelectedCountRivals(item)}
							key={item}
							className={cn(
								'w-full rounded-base-x1 py-base-x1 px-base-x3 border border-white relative',
								selectedCountRivals === item
									? 'border-solid bg-radial-gradient bg-gradient'
									: 'border-dashed'
							)}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
				</div>
			</div>
			{/*<div className='flex flex-col items-center gap-base-x2'>
				<Typography variant='text'>Соперники</Typography>
				{selectedRivals.length > 0 ? (
					<div className='flex flex-col items-center gap-base-x2 w-full'>
						<div className='flex justify-center gap-base-x7 items-center w-full'>
							{selectedRivals.map(item => (
								<button
									onClick={() => handleRemoveRival(item)}
									className='relative'
									key={item.tg_id}
								>
									<div className='absolute -top-3 -right-3 flex items-center justify-center p-[6px] bg-[#0088CC] rounded-full'>
										<Icon size={14} icon='minus' />
									</div>
									<img
										src={avatar}
										alt=''
										className='w-base-x7 h-base-x7 rounded-base-x1'
									/>
								</button>
							))}
							{selectedRivals.length < selectedCountRivals && (
								<Button
									icon='plus'
									sizeIcon={35}
									onClick={addRivals}
									size='big'
									className='border border-white border-dashed'
									style={{ width: 'fit-content' }}
								/>
							)}
						</div>
						<Typography variant='text'>Ожидаем подтверждения</Typography>
					</div>
				) : (
					<Button
						icon='plus'
						sizeIcon={35}
						onClick={addRivals}
						size='big'
						style={{ width: 'fit-content' }}
						className='border border-white border-dashed'
					/>
				)}
			</div>*/}
		</div>
	)
}

export default Rivals
