import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { getUser } from '@/services/auth/auth.helper'

import { unauthorizedRoutes } from './unauthorizedRoutes'
import { userRoutes } from './userRoutes'

const Navigation = () => {
	const user = getUser()

	const throwUrl = user ? '/menu' : '/auth'

	const routes = useMemo(() => {
		return user ? userRoutes : unauthorizedRoutes
	}, [user])

	return (
		<Routes>
			{routes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={throwUrl} />} />
		</Routes>
	)
}

export default Navigation
