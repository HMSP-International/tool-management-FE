// reducers
import { addNewViewerToProject } from './addNewViewerToProject';
import { changeProject } from './changeProject';
import { getProjects } from './getProjects';
import { currentProject } from './currentProject';
import { deleteProject } from './deleteProject';
import { createProject } from './createProject';
import { getProjectsFromCollaborator } from './getProjectsFromCollaborator';
import { removeViewerFromProject } from './removeViewerFromProject';

const reducers = {
	addNewViewerToProject,
	changeProject,
	getProjects,
	currentProject,
	deleteProject,
	createProject,
	getProjectsFromCollaborator,
	removeViewerFromProject,
};

export default reducers;
