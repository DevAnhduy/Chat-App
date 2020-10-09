import { createStore,combineReducers,applyMiddleware } from 'redux';
import logger from 'redux-logger';
import user from './reducers/user_reducer';
import messages from './reducers/message_reducer';
import list_receivers from './reducers/list_receivers_reducer';
import receiver from './reducers/receiver_reducer';

export default createStore (
    combineReducers({
        user,
        messages,
        list_receivers,
        receiver
    }),
    {},
    applyMiddleware(logger)
);