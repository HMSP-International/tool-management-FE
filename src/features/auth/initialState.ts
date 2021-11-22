import STATUS from '../../constants/status';
import { IInitialState } from './interfaces';

const INITIAL_STATE: IInitialState = {
	status: STATUS.IDLE,
	error: null,

	jwt: null,
};

export default INITIAL_STATE;
