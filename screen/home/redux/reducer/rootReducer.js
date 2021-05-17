import { locationReducer, userLocationReducer } from './location'
import { bucket } from './cart';
import { combineReducers } from 'redux'
import { grocery } from './grocery';

const RootReducer = combineReducers({

    locationReducer: locationReducer,
    userLocationReducer: userLocationReducer,
    grocery: grocery,
    bucket: bucket,

})


export default RootReducer;