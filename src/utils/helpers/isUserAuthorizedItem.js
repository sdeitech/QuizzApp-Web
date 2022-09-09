import store from '../../redux/store';
import { SUBSCRIBE_PLAN } from '../enum';

const isUserAuthorizedItem = (itemSubType = SUBSCRIBE_PLAN.BASIC) => {
    // let userSubType = SUBSCRIBE_PLAN.BASIC;
    let userSubType = store.getState().subscribeReducer.subscriptionData.subscriptionCode;

    let isUserAuthorized = false;

    if (userSubType === SUBSCRIBE_PLAN.PREMIUM) {
        isUserAuthorized = true;
    } else if (userSubType === SUBSCRIBE_PLAN.PRO) {
        if (itemSubType === SUBSCRIBE_PLAN.PRO || itemSubType=== SUBSCRIBE_PLAN.BASIC) {
            isUserAuthorized = true;
        }
    } else if (userSubType === SUBSCRIBE_PLAN.BASIC) {
        if (itemSubType=== SUBSCRIBE_PLAN.BASIC) {
            isUserAuthorized = true;
        }
    }

    return isUserAuthorized;
}

export default isUserAuthorizedItem;
