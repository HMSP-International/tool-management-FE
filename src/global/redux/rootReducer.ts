import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// reducers
import authReducer from '../../slices/auth/slice';
import collaboratorReducer from '../../slices/collaborator/slice';
import dashboardReducer from '../../slices/dashboard/slice';
import paticipantReducer from '../../slices/paticipant/slice';
import projectReducer from '../../slices/project/slice';
import spaceReducer from '../../slices/space/slice';
import userReducer from '../../slices/user/slice';
import taskListReducer from '../../slices/taskList/slice';
// persist configs
import authPersistConfig from '../../slices/auth/persistConfig';

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	collaborator: collaboratorReducer,
	dashboard: dashboardReducer,
	paticipant: paticipantReducer,
	project: projectReducer,
	space: spaceReducer,
	taskList: taskListReducer,
	user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
