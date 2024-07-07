import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, Layout, Typography } from '@/components/ui'

import { TCurrency } from '@/shared/types'

const Balance: FC = () => {
	const navigate = useNavigate()
	const currency: { icon: TCurrency; title: string; count: string }[] = [
		{ icon: 'fool', title: 'Fool', count: '128' },
		{ icon: 'ton', title: '$TON', count: '64' },
		{ icon: 'usdt', title: '$NOT', count: '32 768' },
		{ icon: 'not', title: 'USD₮', count: '32 768' }
	]

	return (
		<Layout
			header={{ icon: 'balance', title: 'Баланс' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button>Копировать адрес</Button>
					<Button
						onClick={() => navigate(-1)}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
			className='flex flex-col items-center gap-[50px]'
		>
			<div className='flex flex-col items-center justify-center w-full gap-base-x5'>
				{currency.map(item => (
					<div className='grid grid-rows-1 grid-cols-[1fr_0.5fr_1fr] w-full items-center gap-base-x2'>
						<Typography variant='text' className='place-self-end my-auto'>
							{item.title}
						</Typography>
						<Icon icon={item.icon} size={50} className='place-self-center' />
						<Typography variant='text' className='place-self-auto'>
							{item.count}
						</Typography>
					</div>
				))}
			</div>
			<div className='flex flex-col items-center text-center max-w-[290px] gap-base-x5'>
				<Typography variant='text'>
					Для пополнения баланса используйте только сеть ТОН!
				</Typography>
				<Typography variant='text'>
					Вывод средств осуществляется через меню бота.
				</Typography>
			</div>
		</Layout>
	)
}

export default Balance
