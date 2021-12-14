import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateList } from '../interfaces';

export const deleteTaskList = (state: IInitialStateList, action: PayloadAction<string>) => {
	delete state.lists[action.payload];
};
