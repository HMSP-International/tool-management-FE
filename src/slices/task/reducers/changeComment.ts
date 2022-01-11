import { PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'slices/comment/interfaces';
import { IInitialStateTask } from '../interfaces';

export const changeComment = (state: IInitialStateTask, action: PayloadAction<IComment>) => {
	const index = state.currentTask[0].comments.findIndex(c => c._id === action.payload._id);

	state.currentTask[0].comments[index] = { ...state.currentTask[0].comments[index], ...action.payload };
};
