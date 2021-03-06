import STATUS from '../../global/constants/status';
import { IInitialStateList } from './interfaces';

const INITIAL_STATE: IInitialStateList = {
	status: STATUS.IDLE,
	error: null,

	lists: {},
	users: [],
};

export default INITIAL_STATE;
