import STATUS from '../../constants/status';
import { IInitialStateAuth } from './interfaces';

const INITIAL_STATE: IInitialStateAuth = {
	status: STATUS.IDLE,
	error: null,

	jwt: null,
};

export default INITIAL_STATE;
