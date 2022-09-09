import actionType from '../action/types';
import { initialState } from '../initialStates';

export default (state = initialState.maxQuestionNumber, { type, payload }) => {
    switch (type) {
        case actionType.CONTEST_MAX_QUESTION_GET:
            return { maxQuestionNumber: payload };
        default:
            return state;
    }
};