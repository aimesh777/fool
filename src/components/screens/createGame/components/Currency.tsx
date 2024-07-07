import cn from 'clsx'
import { FC } from 'react'

import { Icon, Typography } from '@/components/ui'

import { TCurrency } from '@/shared/types'

interface IProps {
	selectedCurrency: TCurrency
	setSelectedCurrency: (value: TCurrency) => void
}
const Currency: FC<IProps> = ({ selectedCurrency, setSelectedCurrency }) => {
	const currency: { icon: TCurrency; count: string }[] = [
		{ icon: 'fool', count: '128' },
		{ icon: 'ton', count: '64' },
		{ icon: 'not', count: '32 768' },
		{ icon: 'usdt', count: '32 768' }
	]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>На что играем?</Typography>
			<div className='grid grid-rows-2 grid-cols-2 gap-base-x6 w-full'>
				{currency.map(item => (
					<button
						onClick={() => setSelectedCurrency(item.icon)}
						key={item.icon}
						className={cn(
							'flex gap-base-x2 items-center rounded-base-x1 py-base-x1 px-base-x3 w-full border border-white',
							selectedCurrency === item.icon
								? 'border-solid bg-radial-gradient bg-gradient'
								: 'border-dashed'
						)}
					>
						<Icon size={25} icon={item.icon} />
						<Typography variant='text'>{item.count}</Typography>
					</button>
				))}
			</div>
		</div>
	)
}

export default Currency
