import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateTask, ITask } from '../interfaces';

export const changeCurrentTaskModal = (state: IInitialStateTask, action: PayloadAction<ITask>) => {
	state.currentTask[0] = { ...state.currentTask[0], ...action.payload };
};
