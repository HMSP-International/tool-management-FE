import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// reducers
import authReducer from '../features/auth/slice';
import profileReducer from '../features/profile/slice';
import taskListReducer from '../features/taskList/slice';
// persist configs
import authPersistConfig from '../features/auth/persistConfig';

const rootReducer = combineReducers({
	taskList: taskListReducer,
	auth: persistReducer(authPersistConfig, authReducer),
	profile: profileReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
