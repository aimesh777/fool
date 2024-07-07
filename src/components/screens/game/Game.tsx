import { DragDropContext } from '@hello-pangea/dnd'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import { FlyingCard } from '@/components/screens/game/components'
import { Layout } from '@/components/ui'

import { Fall, Fan, Pack, Rivals, Table } from './components'
import { IRival, ITypeCard, TPositionCard } from './game.interface'

const Game: FC = () => {
	const [cardsOnTable, setCardsOnTable] = useState<ITypeCard[][]>([[]])
	const rivalsInfo: IRival[] = [
		{ name: '<username1>', numberOfCards: 0 },
		{ name: '<username2>', numberOfCards: 0 },
		{ name: '<username3>', numberOfCards: 0 }
	]

	const [myCards, setMyCards] = useState<ITypeCard[]>([])

	// Карты анимации
	const [currentFlyingCards, setCurrentFlyingCards] = useState<ReactNode[]>([])
	const flyingCardsRef = useRef<HTMLDivElement>(null)

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
						'bottom'
					)
				}, (ii + i * 10) * 200)
			}
		}
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
		from: number[],
		to: number[],
		scale: number = 78,
		pos: TPositionCard = 'top',
		animation?: boolean
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
				position={pos}
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
				<div className={'flex flex-row items-center justify-between'}>
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
				</div>
				<Rivals rivals={rivalsInfo} />
				<Fall />
				<Pack />

				<Table cardsOnTable={cardsOnTable} />
				<Fan cards={myCards} ready={buttonPress} />
			</Layout>
		</DragDropContext>
	)
}

export default Game
