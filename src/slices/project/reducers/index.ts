// reducers
import { changeProject } from './changeProject';
import { getProjects } from './getProjects';
import { currentProject } from './currentProject';
import { deleteProject } from './deleteProject';
import { createProject } from './createProject';
import { getProjectsFromCollaborator } from './getProjectsFromCollaborator';

const reducers = {
	changeProject,
	getProjects,
	currentProject,
	deleteProject,
	createProject,
	getProjectsFromCollaborator,
};

export default reducers;
