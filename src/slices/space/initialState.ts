import STATUS from '../../constants/status';
import { IInitialStateSpace } from './interfaces';

const INITIAL_STATE: IInitialStateSpace = {
	status: STATUS.IDLE,
	error: null,

	spaces: []
};

export default INITIAL_STATE;
