import STATUS from '../../global/constants/status';
import { IInitialStateUser } from './interfaces';

const INITIAL_STATE: IInitialStateUser = {
	status: STATUS.IDLE,
	error: null,

	profile:
		{
			_id: '',
			displayName: '',
			department: '',
			position: '',
			title: '',
			email: '',
		},
};

export default INITIAL_STATE;
