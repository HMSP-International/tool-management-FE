import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// reducers
import authReducer from '../features/auth/slice';
import dashboardReducer from '../features/dashboard/slice';
import projectReducer from '../features/project/slice';
import spaceReducer from '../features/space/slice';
import userReducer from '../features/user/slice';
import taskListReducer from '../features/taskList/slice';
// persist configs
import authPersistConfig from '../features/auth/persistConfig';

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	dashboard: dashboardReducer,
	project: projectReducer,
	space: spaceReducer,
	taskList: taskListReducer,
	user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
