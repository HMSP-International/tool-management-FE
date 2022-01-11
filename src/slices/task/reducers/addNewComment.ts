import { PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'slices/comment/interfaces';
import { IInitialStateTask } from '../interfaces';

export const addNewComment = (state: IInitialStateTask, action: PayloadAction<IComment>) => {
	state.currentTask[0].comments.push(action.payload);
};
