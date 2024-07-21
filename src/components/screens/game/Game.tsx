import { DragDropContext } from '@hello-pangea/dnd'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, Layout, Modal, Typography } from '@/components/ui'

import { getId } from '@/services/auth/auth.helper'
import { getGame } from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

import { getWebSocket } from '@/websocket'

import { Fall, Fan, FlyingCard, Pack, Rivals, Table } from './components'
import { IRival, ITypeCard, TPositionCard } from './game.interface'
import { addRival } from './game.utils'
import { useGame } from './useGame'

const Game: FC = () => {
	const navigate = useNavigate()
	const game = getGame()
	const tg_id = getId()
	const { rivals } = useGame()
	const [players, setPlayers] = useState<IRival[]>([])
	const [cardsOnTable, setCardsOnTable] = useState<ITypeCard[][]>([[]])
	const [myCards, setMyCards] = useState<ITypeCard[]>([])
	const [placeRival, setPlaceRival] = useState<number>()

	// Карты анимации
	const [currentFlyingCards, setCurrentFlyingCards] = useState<ReactNode[]>([])
	const flyingCardsRef = useRef<HTMLDivElement>(null)

	const [rivalsInfo, setRivalsInfo] = useState<IRival[]>([
		{ name: '<username1>', numberOfCards: 0 },
		{ name: '<username2>', numberOfCards: 0 },
		{ name: '<username3>', numberOfCards: 0 }
	])
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		if (!game.id) navigate('/create-game')
	}, [])

	const global_ws = getWebSocket()
	let game_ws = new WebSocket(
		`wss://api.tonfool.online/ws/game/${game.id}/${tg_id}/1`
	)

	game_ws.onerror = error => {
		console.error('WebSocket error:', error)
		game_ws = new WebSocket(
			`wss://api.tonfool.online/ws/game/${game.id}/${tg_id}/1`
		)
	}

	useEffect(() => {
		game_ws.onmessage = function (event) {
			const data = JSON.parse(event.data)

			switch (data.action) {
				case 'connect': {
					console.log('connect', data)

					if (JSON.stringify(data.players) !== JSON.stringify(players)) {
						setPlayers(data.players)
					}
					break
				}
				case 'disconnect': {
					console.log('disconnect', data)

					break
				}
				case 'ready': {
					console.log('ready', data)
					break
				}
				case 'start': {
					// карты игрока
					// когда все нажали готов
					console.log('ready', data)
					break
				}
			}
		}
	}, [])

	console.log(players)

	// Пригласить игрока
	const handlerAddRival = (tg_id: number) => {
		addRival({ global_ws, tg_id, game_id: game.id, place: placeRival })
	}

	// Добавлять место приглашенного игрока
	const handlerShowModal = (place: number) => {
		setPlaceRival(place)
		setShowModal(true)
	}

	useEffect(() => {
		if (cardsOnTable.length < 6) {
			if (cardsOnTable.length > 0) {
				if (cardsOnTable[cardsOnTable.length - 1].length > 0) {
					setCardsOnTable([...cardsOnTable, []])
				}
			}
		}
	}, [cardsOnTable])

	const addCard = (cardIndex: number) => {
		setCardsOnTable([...cardsOnTable.slice(0, -1), [myCards[cardIndex]]])
		setMyCards([
			...myCards.slice(0, cardIndex),
			...myCards.slice(cardIndex + 1)
		])
	}

	const rivalAddCard = (cardData: ITypeCard, rivalNum: number) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			{ suit: 'spades', value: 7 },
			[100, poses[rivalNum] + 25],
			[window.screen.availHeight / 2, -90],
			110,
			'top',
			true
		)

		setTimeout(() => {
			setCardsOnTable([...cardsOnTable.slice(0, -1), [cardData]])
		}, 600)
	}

	const rivalBeatCard = (
		cardData: ITypeCard,
		rivalNum: number,
		cardPlaceIndex
	) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			{ suit: 'spades', value: 7 },
			[200, poses[rivalNum]],
			[window.screen.availHeight / 2, -90],
			110,
			'top',
			true
		)

		setTimeout(() => {
			setCardsOnTable([
				...cardsOnTable.slice(0, cardPlaceIndex),
				[...cardsOnTable[cardPlaceIndex], cardData],
				...cardsOnTable.slice(cardPlaceIndex + 1)
			])
		}, 600)
	}

	const rivalTakeCards = (rivalNum: number) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			{ suit: 'spades', value: 7 },
			[window.screen.availHeight / 2 + 450, 0],
			[220, poses[rivalNum]],
			50,
			'bottom'
		)
		let a = []
		cardsOnTable.forEach(aa => {
			aa.forEach(aaa => {
				a.push(aaa)
			})
		})
		setCardsOnTable([[]])
		rivalsInfo[rivalNum].numberOfCards += a.length
	}

	const giveCardToRivals = (numCards: Array<number>) => {
		let poses = [-400, -100, 160]
		for (let i = 0; i < numCards.length; i++) {
			for (let ii = 0; ii < numCards[i]; ii++) {
				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 7 },
						[250, -600],
						[200, poses[i]],
						50,
						'bottom',
						false
					)
				}, (ii + i * 10) * 200)
			}
		}

		let new_rivals = rivalsInfo
		setTimeout(() => {
			for (let i = 0; i < new_rivals.length; i++) {
				new_rivals[i].numberOfCards += numCards[i]
				setRivalsInfo(new_rivals)
			}
		}, 5000)
	}

	const beatCard = (cardIndex: number, cardPlaceIndex: number) => {
		setCardsOnTable([
			...cardsOnTable.slice(0, cardPlaceIndex),
			[...cardsOnTable[cardPlaceIndex], myCards[cardIndex]],
			...cardsOnTable.slice(cardPlaceIndex + 1)
		])
		setMyCards([
			...myCards.slice(0, cardIndex),
			...myCards.slice(cardIndex + 1)
		])
	}

	const spawnCard = (cardNum: object) => {
		setCurrentFlyingCards([
			...currentFlyingCards,
			<FlyingCard
				key={Date.now() * Math.floor(Math.random() * 1000)}
				id={cardNum}
				onPause={() => {}}
				from={[160, -300]}
				to={[window.screen.availHeight + 50, -50]}
				scale={100}
			/>
		])
		setTimeout(() => {
			setMyCards(actual => {
				return [cardNum, ...actual] as ITypeCard[]
			})
		}, 200)
	}

	const spawnCardWithCords = (
		cardNum: object,
		from: Array<number>,
		to: Array<number>,
		scale: number = 78,
		position: TPositionCard = 'top',
		animation: boolean = false
	) => {
		setCurrentFlyingCards([
			...currentFlyingCards,
			<FlyingCard
				key={Date.now()}
				id={cardNum}
				onPause={() => {}}
				from={from}
				to={to}
				scale={scale}
				position={position}
				animation={animation}
			/>
		])
	}

	const fallCards = () => {
		if (cardsOnTable.length == 6) {
			try {
				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 7 },
						[window.screen.availHeight / 2 - 160, -144],
						[160, 300]
					)
					setCardsOnTable([[]])
				}, 3000)
				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 8 },
						[window.screen.availHeight / 2 - 160, -50],
						[150, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -5)])
				}, 2500)

				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 8 },
						[window.screen.availHeight / 2 - 10, -144],
						[150, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -4)])
				}, 2000)

				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 8 },
						[window.screen.availHeight / 2 - 10, -50],
						[140, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -3)])
				}, 1500)

				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 8 },
						[window.screen.availHeight / 2 + 160, -144],
						[130, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -2)])
				}, 1000)
				setTimeout(() => {
					spawnCardWithCords(
						{ suit: 'spades', value: 8 },
						[window.screen.availHeight / 2 + 160, -50],
						[120, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -1)])
				}, 500)
			} catch {
				setCardsOnTable([[]])
			}
		} else {
			spawnCardWithCords(
				{ suit: 'spades', value: 7 },
				[window.screen.availHeight / 2, 0],
				[160, 300]
			)
			setCardsOnTable([[]])
		}
	}

	const takeCards = () => {
		spawnCardWithCords(
			{ suit: 'spades', value: 7 },
			[window.screen.availHeight / 2, 0],
			[window.screen.availHeight + 50, -50]
		)
		let a = []
		cardsOnTable.forEach(aa => {
			aa.forEach(aaa => {
				a.push(aaa)
			})
		})
		setCardsOnTable([[]])
		setTimeout(() => {
			setMyCards([...a, ...myCards])
		}, 200)
	}

	const buttonPress = () => {
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 7 })
		}, 0)
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 8 })
		}, 200)
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 9 })
		}, 400)
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 10 })
		}, 600)
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 7 })
		}, 800)
		setTimeout(() => {
			spawnCard({ suit: 'spades', value: 7 })
		}, 1000)
		setTimeout(() => {
			giveCardToRivals([6, 5, 4])
		}, 1200)
	}

	function onDragEnd(result: any) {
		let destinationName = result.destination?.droppableId || ''
		if (destinationName.startsWith('droppable-table-card')) {
			const destinationIndex = +destinationName.replace(
				'droppable-table-card-',
				''
			)
			// подкинуть карту
			if (!cardsOnTable[destinationIndex].length) {
				addCard(result.source.index)
			}
			// побить карту
			else {
				if (cardsOnTable[destinationIndex].length === 1) {
					beatCard(result.source.index, destinationIndex)
				}
			}
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Layout
				noLogo
				className='flex flex-col items-center justify-berween h-full relative'
			>
				<div
					ref={flyingCardsRef}
					className='floating-cards overflow-visible w-0 h-0 relative'
				>
					{currentFlyingCards}
				</div>

				{/*<div className={'flex flex-row items-center justify-between'}>
					<button onClick={fallCards}>DEV fall</button>
					<button onClick={takeCards}>DEV take</button>
					<button
						onClick={() => {
							rivalAddCard({ suit: 'spades', value: 8 }, 1)
						}}
					>
						DEV rival add card
					</button>
					<button
						onClick={() => {
							rivalBeatCard({ suit: 'spades', value: 8 }, 1, 0)
						}}
					>
						DEV rival beat card
					</button>
					<button
						onClick={() => {
							rivalTakeCards(1)
						}}
					>
						DEV rivals take
					</button>
				</div>*/}
				<Rivals
					rivals={players.filter(item => item.tg_id != tg_id)}
					handlerShowModal={handlerShowModal}
				/>
				<div className='flex gap-base-x2 mt-base-x7'>
					<Icon size={26} icon={game.currency} />
					<Typography variant='h1'>{game.bet}</Typography>
				</div>
				<Fall />
				<Pack />

				<Table cardsOnTable={cardsOnTable} />
				<Fan cards={myCards} ready={buttonPress} />

				<Modal
					show={showModal}
					handleClose={() => setShowModal(false)}
					header={{ icon: 'swords', title: 'Соперники' }}
					footer={<Button onClick={() => setShowModal(false)}>Готов</Button>}
				>
					<div className='flex flex-col gap-base-x4 w-full'>
						{rivals &&
							rivals.map(item => (
								<button
									onClick={() => handlerAddRival(item.tg_id)}
									className='flex justify-between items-center gap-base-x3 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
									key={item.tg_id}
								>
									<div className='flex items-center gap-base-x5'>
										<img
											src={item.photo_url ? item.photo_url : avatar}
											alt=''
											className='w-base-x7 h-base-x7 rounded-base-x1'
										/>
										<Typography variant='text'>{item.username}</Typography>
									</div>
								</button>
							))}
					</div>
				</Modal>
			</Layout>
		</DragDropContext>
	)
}

export default Game
