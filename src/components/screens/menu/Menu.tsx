import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout } from '@/components/ui'

import { Profile } from './components'
import { menu } from './menu.data'

const Menu: FC = () => {
	const navigate = useNavigate()
	return (
		<Layout className='flex flex-col gap-base-x6 '>
			<Profile />
			<div className='flex flex-col gap-5 w-full'>
				{menu.map(item => (
					<Button
						onClick={() => navigate(item.path)}
						key={item.path}
						sizeIcon={30}
						icon={item.icon}
						variant='h1'
					>
						{item.soon && (
							<span className='text-yellow font-bold absolute right-4 transform -rotate-[20deg]'>
								soon
							</span>
						)}
						{item.title}
					</Button>
				))}
			</div>
		</Layout>
	)
}

export default Menu
