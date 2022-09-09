import { combineReducers } from 'redux'
import authReducer from './auth.Reducer'
import userReducer from './user.Reducer'
import actionType from '../action/types'
import countryLabelReducer from './countryPicker.Reducer'
import contestReducer from '../../reducer/contest.Reducer';
import dashboardReducer from './dashboard.Reducer';
import playReducer from './play.Reducer';
import videoReducer from './video.Reducer';
import gameReducer from './game.Reducer';
import subscribeReducer from './subscribe.Reducer';
import questionReducer from './questions.Reducer';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    countryLabelReducer,
    contestReducer,
    dashboardReducer,
    playReducer,
    videoReducer,
    subscribeReducer,
    gameReducer,
    questionReducer
})

// const rootReducer = (state, action) => {
//     if (action['type'] === actionType['LOGOUT']) state = undefined
//     return appReducer(state, action)
// }

export default rootReducer