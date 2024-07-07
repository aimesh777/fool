import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout } from '@/components/ui'

import { TCurrency, TTypeGame } from '@/shared/types'

import { Bet, Currency, ModalSelectRivals, Rivals, Type } from './components'

const CreateGame: FC = () => {
	const [showModal, setShowModal] = useState(false)
	const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>('fool')
	const [selectedBet, setSelectedBet] = useState(7)
	const [selectedType, setSelectedType] = useState<TTypeGame>('thrown-up')
	const [selectedRivals, setSelectedRivals] = useState(['0', '1'])
	const navigate = useNavigate()

	return (
		<Layout
			header={{
				icon: showModal ? 'swords' : 'fan',
				title: showModal ? 'Соперники' : 'Новая игра'
			}}
			footer={
				selectedRivals.length > 0 ? (
					<div className='flex w-full gap-base-x2'>
						<Button onClick={() => navigate('/game')}>Играть</Button>
						<Button
							onClick={() => navigate(-1)}
							icon='back'
							style={{ width: 63 }}
						/>
					</div>
				) : (
					<Button onClick={() => navigate(-1)}>Отмена</Button>
				)
			}
			className='flex flex-col gap-base-x2'
		>
			<Currency
				setSelectedCurrency={setSelectedCurrency}
				selectedCurrency={selectedCurrency}
			/>
			<Bet
				setSelectedBet={setSelectedBet}
				selectedBet={selectedBet}
				selectedCurrency={selectedCurrency}
			/>
			<Type selectedType={selectedType} setSelectedType={setSelectedType} />
			<Rivals
				selectedRivals={selectedRivals}
				setSelectedRivals={setSelectedRivals}
				addRivals={() => setShowModal(true)}
			/>
			<ModalSelectRivals
				isOpen={showModal}
				handleClose={() => setShowModal(false)}
			/>
		</Layout>
	)
}

export default CreateGame
