import { getId } from '@/services/auth/auth.helper'

let socket: WebSocket | null = null

export const initWebSocket = () => {
	const tg_id = getId()

	socket = new WebSocket(`wss://api.tonfool.online/ws/global/${tg_id}`)

	socket.onopen = () => {
		console.log('WebSocket connected')
	}

	socket.onclose = () => {
		console.log('WebSocket disconnected')
		socket = new WebSocket(`wss://api.tonfool.online/ws/global/${tg_id}`)
	}

	socket.onerror = error => {
		console.error('WebSocket error:', error)
		initWebSocket()
	}

	socket.onmessage = event => {
		console.log('WebSocket', event)
	}
}

export const getWebSocket = (): WebSocket => {
	if (!socket) {
		initWebSocket()

		throw new Error('WebSocket is not initialized')
	}
	return socket
}
