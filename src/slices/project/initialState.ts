import STATUS from '../../global/constants/status';
import { IInitialStateProject } from './interfaces';

const INITIAL_STATE: IInitialStateProject = {
	status: STATUS.IDLE,
	error: null,

	projects: {},

	projectsFromCollaborator: {},

	currentProject:
		{
			name: '',
			order: -1,
			owner: '',
			_id: '',
			_spaceId: '',
			viewers: [],
		},
};

export default INITIAL_STATE;
