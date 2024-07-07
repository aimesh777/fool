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
		window.addEventListener('load', handleLoading)
		tg.ready()
		return () => window.removeEventListener('load', handleLoading)
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
