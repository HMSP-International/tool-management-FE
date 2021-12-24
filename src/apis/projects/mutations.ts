import { gql } from '@apollo/client';

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

export const GET_PROJECTS_BY_SPACES_AND_MEMBER_MUTATION = gql`
	mutation getProjectsBySpacesAndMember($projectsBySpacesAndMemberInput: ProjectsBySpacesAndMemberInput!) {
		getProjectsBySpacesAndMember(projectsBySpacesAndMemberInput: $projectsBySpacesAndMemberInput) {
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

export const DELETE_PROJECT_MUTATION = gql`
	mutation DELETE_PROJECT($deleteProjectInput: DeleteProjectInput!) {
		deleteProject(deleteProjectInput: $deleteProjectInput) {
			_id
			_spaceId
			owner
			name
			order
		}
	}
`;
