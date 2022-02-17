import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist:
		[
			'auth',
			'collaborator',
			'comment',
			'dashboard',
			'paticipant',
			'project',
			'role',
			'space',
			'task',
			'taskList',
			'user',
		],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware:
		getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
});

export const persistor = persistStore(store);
