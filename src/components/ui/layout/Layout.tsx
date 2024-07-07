import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

import { Typography } from '@/components/ui'
import Logo from '@/components/ui/Logo'

import Icon from '../icon/Icon'

import { ILayout } from './layout.interface'

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	noLogo,
	className,
	header,
	footer
}) => {
	const route = useLocation()
	return (
		<div
			className={cn(
				'flex flex-col justify-between items-center py-base-x4 mb-base-x4 gap-base-x2 px-[10%] h-full',
				route.pathname !== '/game' && 'overflow-auto'
			)}
		>
			<div className='flex flex-col items-center gap-base-x4 w-full h-full'>
				{!noLogo && <Logo />}
				{header && (
					<div className='flex items-center justify-center gap-base-x2 py-base-x2 relative z-50 bg-radial-gradient w-full'>
						<Icon icon={header.icon} size={30} />
						<Typography variant='h1'>{header.title}</Typography>
					</div>
				)}
				<div className={cn('w-full h-full', className)}>{children}</div>
			</div>
			{footer}
		</div>
	)
}

export default Layout
