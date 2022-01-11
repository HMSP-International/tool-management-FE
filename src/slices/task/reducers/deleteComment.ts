import { PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'slices/comment/interfaces';
import { IInitialStateTask } from '../interfaces';

export const deleteComment = (state: IInitialStateTask, action: PayloadAction<IComment>) => {
	state.currentTask[0].comments = state.currentTask[0].comments.filter(c => c._id !== action.payload._id);
};
