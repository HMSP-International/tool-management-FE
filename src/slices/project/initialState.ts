import STATUS from '../../global/constants/status';
import { IInitialStateProject } from './interfaces';

const INITIAL_STATE: IInitialStateProject = {
	status: STATUS.IDLE,
	error: null,

	projects: {},
};

export default INITIAL_STATE;
