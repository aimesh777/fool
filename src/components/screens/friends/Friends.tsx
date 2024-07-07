import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

const Friends: FC = () => {
	const navigate = useNavigate()
	const friends = [
		{ name: 'tg_username-1', place: 1, selected: true, online: true },
		{ name: 'tg_username-2', place: 2, selected: true, online: true },
		{ name: 'tg_username-3', place: 3, selected: false, online: false },
		{ name: 'tg_username-4', place: 4, selected: false, online: false }
	]

	return (
		<Layout
			header={{ icon: 'friends', title: 'Друзья' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button>Пригласить</Button>
					<Button
						onClick={() => navigate(-1)}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
		>
			<div className='flex flex-col gap-base-x6'>
				{friends.map(item => (
					<button
						className='flex items-center gap-base-x5 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
						key={item.name}
					>
						<img
							src={avatar}
							alt=''
							className='w-base-x7 h-base-x7 rounded-base-x1'
						/>
						<div className='flex flex-col justify-between'>
							<div className='flex gap-base-x1 items-center'>
								<Typography variant='text'>{item.name}</Typography>
								<Typography
									variant='text'
									className={cn(item.online ? 'text-green' : 'text-red')}
								>
									{item.online ? 'online' : 'offline'}
								</Typography>
							</div>
							<div className='flex gap-base-x1 items-center'>
								<Typography variant='text'>547 / 331</Typography>
								<Typography variant='text'>🏆 3323</Typography>
							</div>
						</div>
					</button>
				))}
			</div>
		</Layout>
	)
}

export default Friends
