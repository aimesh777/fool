import cn from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'

import { Typography } from '@/components/ui'
import Logo from '@/components/ui/Logo'

import { IWebSocketResponse } from '@/shared/types/game.interface'

import { useModal } from '@/providers/ModalContext'
import { getWebSocket, initWebSocket } from '@/websocket'

import Icon from '../icon/Icon'

import { ILayout } from './layout.interface'

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	noLogo,
	className,
	header,
	footer
}) => {
	const { setVisible, setInfo } = useModal()
	const socket = getWebSocket()

	socket.onmessage = event => {
		const message: { action: string; data: IWebSocketResponse } = JSON.parse(
			event.data
		)
		if (message.action === 'invite') {
			setInfo(message.data)
			setVisible(true)
		}
	}

	return (
		<div className='flex flex-col justify-between items-center py-base-x4 px-[10%] h-full'>
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
