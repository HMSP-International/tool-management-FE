import { gql } from '@apollo/client';

export const CREATE_SPACE_MUTATION = gql`
	mutation CreateSpace($createSpaceInput: CreateSpaceInput!) {
		createSpace(createSpaceInput: $createSpaceInput) {
			_id
			name
			owner
			order
		}
	}
`;

export const GET_PROJECTS_MUTATION = gql`
	mutation Project($getProjectsInput: GetProjectsInput!) {
		getProjects(getProjectsInput: $getProjectsInput) {
			_id
			_spaceId
			name
			order
			owner
		}
	}
`;

export const CREATE_PROJECT_MUTATION = gql`
	mutation CreateProject($createProjectInput: CreateProjectInput!) {
		createProject(createProjectInput: $createProjectInput) {
			_id
			name
			owner
			order
			_spaceId
		}
	}
`;
