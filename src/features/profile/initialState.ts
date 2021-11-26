import STATUS from '../../constants/status';
import { IInitialStateProfile } from './interfaces';

const INITIAL_STATE: IInitialStateProfile = {
	status: STATUS.IDLE,
	error: null,

	name: null,
	department: null,
	position: null,
	title: null,
	email: null
};

export default INITIAL_STATE;
