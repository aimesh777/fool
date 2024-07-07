import { FC } from 'react'

import { Button, Icon, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

interface IProps {
	selectedRivals: string[]
	setSelectedRivals: (value: string[]) => void
	addRivals: () => void
}

const Rivals: FC<IProps> = ({
	selectedRivals,
	setSelectedRivals,
	addRivals
}) => {
	const handleRemoveRival = rivalToRemove => {
		setSelectedRivals(selectedRivals.filter(rival => rival !== rivalToRemove))
	}

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Соперники</Typography>
			{selectedRivals.length > 0 ? (
				<div className='flex flex-col items-center gap-base-x2 w-full'>
					<div className='flex justify-center gap-base-x7 items-center w-full'>
						{selectedRivals.map(item => (
							<button
								onClick={() => handleRemoveRival(item)}
								className='relative'
								key={item}
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
						{selectedRivals.length < 3 && (
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
		</div>
	)
}

export default Rivals
