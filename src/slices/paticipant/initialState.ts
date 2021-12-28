import STATUS from '../../global/constants/status';
import { IInitialStatePaticipant } from './interfaces';

const INITIAL_STATE: IInitialStatePaticipant = {
	status: STATUS.IDLE,
	error: null,

	userBeLongProject: [],
	paticipants: [],
};

export default INITIAL_STATE;
