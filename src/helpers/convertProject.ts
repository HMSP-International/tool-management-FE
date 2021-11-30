import { IProject, IElementProject } from '../features/project/interfaces';

export interface IConverProject {
	(projects: IProject[]): IElementProject;
}

export const convertProject: IConverProject = projects => {
	const newProjects = projects.reduce((result: IElementProject, project) => {
		if (result[project._spaceId] === undefined) {
			result[project._spaceId] = [];
		}
		result[project._spaceId].push(project);

		return result;
	}, {});

	return newProjects;
};
