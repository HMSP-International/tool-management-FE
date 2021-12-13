import { PayloadAction } from '@reduxjs/toolkit';
import { ITaskList, IInitialStateList } from '../interfaces';

export const createNewList = (state: IInitialStateList, action: PayloadAction<ITaskList>) => {
	state.lists = { ...state.lists, ...action.payload };
};
