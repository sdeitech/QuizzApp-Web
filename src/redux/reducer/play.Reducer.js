// import { initialState } from '../initialStates'
import actionType from '../action/types'
import { consoleLog } from '../../components/helper'

const initialState = {
    playingRounds: [],
    currentRound: undefined,
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case actionType['SET_PLAYABLE_ROUNDS']:
            return {
                ...state,
                playingRounds: payload
            }
        case actionType['SET_CURRENT_ROUND']:
            return {
                ...initialState,
                currentRound: payload
            }
        default: return { ...state }
    }
}