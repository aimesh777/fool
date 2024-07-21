import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Loading } from '@/components/screens'
import { Button, Modal, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

import Navigation from '@/navigation/Navigation'
import { getWebSocket, initWebSocket } from '@/websocket'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	const [showModal, setShowModal] = useState(false)
	const [info, setInfo] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const handleLoading = () => {
		setTimeout(() => setIsLoading(false), 500)
	}

	useEffect(() => {
		initWebSocket()
		const socket = getWebSocket()

		if (
			document.readyState === 'complete' ||
			document.readyState === 'interactive'
		) {
			handleLoading()
		} else {
			const onContentLoaded = () => {
				handleLoading()
				window.removeEventListener('load', onContentLoaded)
			}
			window.addEventListener('load', onContentLoaded)
		}

		socket.onmessage = event => {
			const message: { action: any; data: any } = JSON.parse(event.data)

			if (message.action === 'invite') {
				setShowModal(true)
				setInfo(message.data)
			}
		}

		return () => {
			socket.close()
		}
	}, [])

	const onSubmit = () => {
		// navigate('/game')
		console.log('принимаю игру')
	}

	if (isLoading) return <Loading />

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Navigation />

				<Modal
					show={showModal}
					handleClose={() => setShowModal(false)}
					footer={
						<div className='flex w-full gap-base-x2'>
							<Button onClick={onSubmit}>Играть</Button>
							<Button
								onClick={() => setShowModal(false)}
								icon='back'
								style={{ width: 63 }}
							/>
						</div>
					}
					header={{ title: 'Приглашение в игру', icon: 'fan' }}
				>
					<div className='flex flex-col items-center gap-base-x4 w-full'>
						<img
							src={avatar}
							alt=''
							className='w-base-x7 h-base-x7 rounded-base-x1'
						/>
						<Typography variant='text'>приглашает Вас в игру</Typography>
						<div className='flex flex-col gap-base-x2 items-center'>
							<Typography variant='h1'>Параметры игры:</Typography>
							<Typography variant='text'>
								Ставка: <span className='font-bold'>100 $FOOL</span>
							</Typography>
							<Typography variant='text'>
								Тип игры: <span className='font-bold'>Подкидной</span>
							</Typography>
							<Typography variant='text'>
								Количество игроков: <span className='font-bold'>4</span>
							</Typography>
						</div>
					</div>
				</Modal>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
