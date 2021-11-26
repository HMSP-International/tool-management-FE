import { IInitialStateAuth } from '../interfaces';
import INITIAL_STATE from '../initialState';

export const logout = (state: IInitialStateAuth) => {
	state.jwt = INITIAL_STATE.jwt;
	state.error = INITIAL_STATE.error;
	state.status = INITIAL_STATE.status;
};
