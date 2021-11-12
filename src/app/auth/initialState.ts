import STATUS from '../../constants/status';

const INITIAL_STATE = {
	status: STATUS.IDLE,
	error: null,
};

export interface IInitialState {
	status: string;
	error?: null;
}

export default INITIAL_STATE;
