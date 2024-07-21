import { FC } from "react";

import { Typography } from "@/components/ui";

import QD from "@/assets/cards/QD.svg";
import cover from "@/assets/cards/cover.svg";

const Pack: FC = () => {
	return (
		<div className='absolute transform top-[140px] rotate-[40deg] -left-[140px]'>
			<Typography
				variant='text'
				className='absolute flex items-center bg-white z-20 -rotate-[40deg] justify-center right-base-x1 top-base-x1 w-base-x6 h-base-x6 rounded-full text-blue font-bold border-2 border-blue'
			>
				36
			</Typography>
			<div
				className='w-[90px] h-[125px] rounded-base-x1 relative z-10'
				style={{
					backgroundImage: `url(${cover})`
				}}
			/>
			<div
				className='w-[90px] h-[125px] relative transform rotate-90 translate-x-[50%] translate-y-[-100%] rounded-base-x1'
				style={{
					backgroundImage: `url(${QD})`
				}}
			/>
		</div>
	)
}

export default Pack
