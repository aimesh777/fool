import { FC } from 'react'

import { Typography } from '@/components/ui'

import cover from '@/assets/cards/cover.svg'

const Fall: FC = () => {
	return (
		<div className='absolute transform rotate-[40deg] top-[140px] -right-[90px]'>
			<Typography
				variant='text'
				className='absolute flex items-center bg-white -rotate-[40deg] justify-center left-base-x1 bottom-base-x1 w-base-x6 h-base-x6 rounded-full text-blue font-bold border border-2 border-blue'
			>
				36
			</Typography>
			<div
				className='w-[90px] h-[125px] bg-white text-[#000] rounded-base-x1'
				style={{
					backgroundImage: `url(${cover})`
				}}
			/>
		</div>
	)
}

export default Fall
