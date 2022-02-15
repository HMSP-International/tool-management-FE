import STATUS from '../../global/constants/status';
import { IInitialStateDashboard } from './interfaces';

const INITIAL_STATE: IInitialStateDashboard = {
	status: STATUS.IDLE,
	error: null,

	users: [],
	customers: [],
};

export default INITIAL_STATE;
