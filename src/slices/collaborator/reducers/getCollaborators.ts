import { PayloadAction } from '@reduxjs/toolkit';
import { ICollaborator, IInitialStateCollaborator } from '../interfaces';
import STATUS from '../../../constants/status';

export const getCollaborators = (
	state: IInitialStateCollaborator,
	action: PayloadAction<ICollaborator[]>,
) => {
	state.collaborators = action.payload;
	state.status = STATUS.SUCCESS;
};
