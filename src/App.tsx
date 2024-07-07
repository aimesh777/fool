import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Loading } from '@/components/screens'

import { useTelegram } from '@/hooks'
import Navigation from '@/navigation/Navigation'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	const { tg } = useTelegram()
	const [isLoading, setIsLoading] = useState(true)

	const handleLoading = () => {
		setTimeout(() => setIsLoading(false), 500)
	}

	useEffect(() => {
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

		tg.ready()
	}, [])

	if (isLoading) return <Loading />

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
