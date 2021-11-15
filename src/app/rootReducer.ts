import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// reducers
import taskListReducer from '../features/taskList/slice';
// persist configs

const rootReducer = combineReducers({
	taskList: taskListReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
