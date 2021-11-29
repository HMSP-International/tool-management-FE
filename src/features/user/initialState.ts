import STATUS from '../../constants/status';
import { IInitialStateUser } from './interfaces';

const INITIAL_STATE: IInitialStateUser = {
	status: STATUS.IDLE,
	error: null,

	profile:
		{
			displayName: '',
			department: '',
			position: '',
			title: '',
			email: '',
		},
};

export default INITIAL_STATE;
