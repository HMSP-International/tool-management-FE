import { PayloadAction } from '@reduxjs/toolkit';
import { ILogin, IInitialState } from '../interfaces';

export const login = (state: IInitialState, action: PayloadAction<ILogin>) => {
	state.jwt = action.payload.jwt;
};
