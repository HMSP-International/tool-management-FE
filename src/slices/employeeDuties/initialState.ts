import STATUS from '../../global/constants/status';
import { IInitialStateEmployeeDuties, IPropsDefaultValue } from './interfaces';

export const PROJECT_DEFAULT: IPropsDefaultValue = {
	label: 'All Projects',
	value: '-1',
};

export const SPACE_DEFAULT: IPropsDefaultValue = {
	label: 'All Workspaces',
	value: '-1',
};

const INITIAL_STATE: IInitialStateEmployeeDuties = {
	status: STATUS.IDLE,
	error: null,

	project:
		{
			label: 'All Projects',
			value: '-1',
		},

	space: SPACE_DEFAULT,
};

export default INITIAL_STATE;
