export const getUser = () => {
	return localStorage.getItem('user')
}

export const saveUser = async (user: any) => {
	await localStorage.setItem('user', user)
}
