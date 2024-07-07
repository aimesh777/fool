import { FC } from 'react'

import { Icon, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

const Profile: FC = () => {
	const currency = [
		{ icon: 'fool', count: '128' },
		{ icon: 'ton', count: '64' },
		{ icon: 'not', count: '32 768' }
	]

	return (
		<div className='flex gap-base-x3'>
			<img
				src={avatar}
				alt=''
				className='w-base-x7 h-base-x7 rounded-base-x1'
			/>
			<div className='flex flex-col justify-between w-full'>
				<div className='flex flex-col'>
					<Typography variant='text'>tg_username</Typography>
					<div className='flex gap-base-x3 items-center'>
						<Typography variant='text'>ID: dFj39S2k</Typography>
						<div className='flex items-center gap-base-x1'>
							<Typography variant='text'>🏆</Typography>
							<Typography variant='text'>7523</Typography>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					{currency.map(item => (
						<div key={item.icon} className='flex gap-base-x1 items-center'>
							<Icon size={18} icon={item.icon} />
							<Typography variant='text'>{item.count}</Typography>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Profile
