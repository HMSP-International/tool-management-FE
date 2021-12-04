import STATUS from '../../constants/status';
import { IInitialStateCollaborator } from './interfaces';

const INITIAL_STATE: IInitialStateCollaborator = {
	status: STATUS.IDLE,
	error: null,

	collaborators: []
};

export default INITIAL_STATE;
