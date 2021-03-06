import STATUS from '../../global/constants/status';
import { IInitialStateUser } from './interfaces';

const INITIAL_STATE: IInitialStateUser = {
	status: STATUS.IDLE,
	error: null,

	profile:
		{
			avatar: '',
			_id: '',
			displayName: '',
			department: '',
			position: '',
			title: '',
			email: '',
			_roleId:
				{
					name: '',
					_id: '',
				},
		},
};

export default INITIAL_STATE;
