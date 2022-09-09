import actionType from '../action/types';
import { initialState } from '../initialStates';

export default (state = initialState.subscriptionData, { type, payload }) => {
    switch (type) {
        case actionType.GET_SUBSCRIBE_DATA:
            return { subscriptionData: payload };
        default:
            return state;
    }
};