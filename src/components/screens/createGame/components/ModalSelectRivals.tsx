import { FC } from 'react'

import { Button, Icon, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

interface IProps {
	isOpen: boolean
	handleClose: () => void
}

const ModalSelectRivals: FC<IProps> = ({ isOpen, handleClose }) => {
	const rivals = [
		{ name: 'tg_username-1', selected: true },
		{ name: 'tg_username-2', selected: true },
		{ name: 'tg_username-3', selected: false },
		{ name: 'tg_username-4', selected: false }
	]

	return (
		<>
			{isOpen && (
				<>
					<div className='bg-[rgba(16,30,86,0.43)] bg-filter bg-repeat absolute top-0 bottom-0 right-0 left-0 z-30'></div>

					<div className='absolute inset-0 pb-base-x4 flex flex-col h-full justify-center px-[10%] z-50'>
						<div className='flex-1 flex flex-col items-center justify-center mx-auto w-full gap-base-x4'>
							{rivals.map(item => (
								<button
									className='flex justify-between items-center gap-base-x3 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
									key={item.name}
								>
									<div className='flex items-center gap-base-x5'>
										<img
											src={avatar}
											alt=''
											className='w-base-x7 h-base-x7 rounded-base-x1'
										/>
										<Typography variant='text'>{item.name}</Typography>
									</div>
									{item.selected && <Icon size={25} icon='checkbox' />}
								</button>
							))}
						</div>
						<Button onClick={handleClose}>Готов</Button>
					</div>
				</>
			)}
		</>
	)
}

export default ModalSelectRivals
