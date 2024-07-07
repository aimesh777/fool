import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout } from '@/components/ui'

import { saveUser } from '@/services/auth/auth.helper'

const Auth: FC = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.setAttribute('data-telegram-login', 'samplebot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-request-access', 'write')
		script.setAttribute('data-onauth', 'onTelegramAuth(user)')

		document.querySelector('.auth')?.appendChild(script)
	}, [])

	const onTelegramAuth = async user => {
		navigate(0)
		await saveUser('user')
		console.log(user.first_name, user.last_name, user.id, user.username)
	}

	;(window as any).onTelegramAuth = onTelegramAuth

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Button className='border border-white' onClick={onTelegramAuth}>
				Войти
			</Button>
		</Layout>
	)
}

export default Auth
