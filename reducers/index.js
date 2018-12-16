import { ADD_DECK, RECEIVE_DECKS, ADD_CARD } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {

        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: [
                        ...state[action.title].questions,
                        action.card
                    ]
                }
            }

        default:
            return state
    }
}

export default decks