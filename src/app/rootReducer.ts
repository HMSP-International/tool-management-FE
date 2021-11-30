import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// reducers
import authReducer from '../features/auth/slice';
import projectReducer from '../features/project/slice';
import spaceReducer from '../features/space/slice';
import userReducer from '../features/user/slice';
import taskListReducer from '../features/taskList/slice';
// persist configs
import authPersistConfig from '../features/auth/persistConfig';

const rootReducer = combineReducers({
	taskList: taskListReducer,
	project: projectReducer,
	space: spaceReducer,
	auth: persistReducer(authPersistConfig, authReducer),
	user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
