import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// reducers
import taskList from './features/taskList/slice';
// persist configs

const rootReducer = combineReducers({
	taskList,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
