export type TCurrency = 'tether' | 'foolcoin' | 'notcoin' | 'toncoin'
export type TTypeGame = 'flip_up' | 'translated'

export interface ICreateGameRequest {
	bet: number
	currency: TCurrency
	game_type: TTypeGame
	num_players: number
}

export interface IGame {
	current_player_id: number
	trump_card: null
	cards_on_table: []
	is_start: boolean
	defending_cards: []
	currency: TCurrency
	host_id: number
	id: string
	game_type: TTypeGame
	remaining_deck: null
	defending_player_id: number
	bet: number
	num_players: number
}
