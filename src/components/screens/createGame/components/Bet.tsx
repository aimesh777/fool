import cn from 'clsx'
import { FC, useState } from 'react'

import { Typography } from '@/components/ui'

import { TCurrency } from '@/shared/types'

interface IProps {
	selectedBet: number
	selectedCurrency: TCurrency
	setSelectedBet: (value: number) => void
}

const Bet: FC<IProps> = ({ setSelectedBet, selectedBet, selectedCurrency }) => {
	const [bet, setBet] = useState(7)
	const [multiplierRate, setMultiplierRate] = useState('')

	const bets = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const multiplierRates = ['x10', 'x50', 'x100', 'x300', 'x500', 'x1000']

	const changeBet = value => {
		setBet(value)
		if (multiplierRate) {
			setSelectedBet(value * parseInt(multiplierRate.split('x')[1]))
		} else {
			setSelectedBet(value)
		}
	}

	const changeMultiplierRate = value => {
		setMultiplierRate(value)

		if (value) {
			setSelectedBet(bet * value.split('x')[1])
		}
	}

	const clearBet = () => {
		setSelectedBet(7)
		setMultiplierRate('')
	}

	// TODO: Должны ли сбрасываться ставка при изменении валюты

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Ставка</Typography>
			<div className='flex flex-col gap-base-x2 w-full'>
				<div className='grid grid-rows-1 grid-cols-9 gap-base-x1'>
					{bets.map((item, index) => (
						<button
							onClick={() => changeBet(item)}
							className={cn(
								'flex items-center h-base-x6 justify-center w-full border border-white rounded-base-x1',
								item === bet
									? 'border-solid bg-radial-gradient bg-gradient'
									: 'border-dashed'
							)}
							key={index}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
				</div>
				<div className='grid grid-rows-1 grid-cols-7 gap-base-x1'>
					{multiplierRates.map((item, index) => (
						<button
							onClick={() => changeMultiplierRate(item)}
							className={cn(
								'flex items-center h-base-x6 justify-center w-full border border-white rounded-base-x1',
								item === multiplierRate
									? 'border-solid bg-radial-gradient bg-gradient'
									: 'border-dashed'
							)}
							key={index}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
					<button
						onClick={() => clearBet()}
						className='flex items-center h-base-x6 justify-center w-full border border-white border-dashed rounded-base-x1'
					>
						<Typography variant='text' className='font-bold'>
							C
						</Typography>
					</button>
				</div>
				<Typography
					variant='button'
					className='text-center py-base-x1 uppercase'
				>
					{selectedBet} {selectedCurrency}
				</Typography>
			</div>
		</div>
	)
}

export default Bet
