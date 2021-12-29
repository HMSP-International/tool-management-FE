import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateList, IList } from '../interfaces';

export const changeList = (state: IInitialStateList, action: PayloadAction<IList>) => {
	const { _id, name } = action.payload;

	state.lists[_id].name = name;
};
