import STATUS from '../../../constants/status';
import { IInitialState } from '../initialState';

interface ILogout {
	(state: IInitialState, action: boolean): void;
}

const logout: ILogout = (state, action) => {
	state.status = STATUS.SUCCESS;
	state.error = null;
};

export default logout;
