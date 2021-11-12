// reducers
import { CreateSliceOptions } from '@reduxjs/toolkit';

import logoutReducer from './logout';

const reducers: CreateSliceOptions = {
	logout: logoutReducer,
};

export default reducers;
