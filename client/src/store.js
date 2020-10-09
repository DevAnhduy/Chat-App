import { createStore,combineReducers,applyMiddleware } from 'redux';
import logger from 'redux-logger';
import user from './reducers/user_reducer';
import messages from './reducers/message_reducer';

export default createStore (
    combineReducers({
        user,
        messages
    }),
    {},
    applyMiddleware(logger)
);