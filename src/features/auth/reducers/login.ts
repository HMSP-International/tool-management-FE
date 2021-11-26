import { PayloadAction } from '@reduxjs/toolkit';
import { ILogin, IInitialStateAuth } from '../interfaces';

export const login = (state: IInitialStateAuth, action: PayloadAction<ILogin>) => {
	state.jwt = action.payload.jwt;
};
