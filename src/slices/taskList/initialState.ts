import STATUS from '../../global/constants/status';

const INITIAL_STATE = {
	status: STATUS.IDLE,
	error: null,

	taskLists: null,
};

export default INITIAL_STATE;
