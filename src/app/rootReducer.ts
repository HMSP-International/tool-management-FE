import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// reducers
import taskListReducer from '../features/taskList/slice';
import authReducer from '../features/auth/slice';
// persist configs
import authPersistConfig from '../features/auth/persistConfig';

const rootReducer = combineReducers({
	taskList: taskListReducer,
	auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
