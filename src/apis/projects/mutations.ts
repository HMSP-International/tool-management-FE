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

export const CHANGE_NAME_PROJECT_MUTATION = gql`
	mutation CHANGE_NAME_PROJECT($changeNameProjectInput: ChangeNameProjectInput!) {
		changeNameProject(changeNameProjectInput: $changeNameProjectInput) {
			_id
			_spaceId
			name
			order
			owner
		}
	}
`;

export const GET_PROJECT_BY_ID_MUTATION = gql`
	mutation GET_PROJECT_BY_ID($getProjectInput: GetProjectInput!) {
		getProjectById(getProjectInput: $getProjectInput) {
			_id
			_spaceId
			name
			order
			owner
			viewers
		}
	}
`;

export const GET_PROJECT_BY_MEMBER_ID_AND_SPACE_ID_MUTATION = gql`
	mutation GetProjectByMemberIdAndSpaceId($findByMemberIdAndSpaceIdInput: FindByMemberIdAndSpaceIdInput!) {
		getProjectByMemberIdAndSpaceId(findByMemberIdAndSpaceIdInput: $findByMemberIdAndSpaceIdInput) {
			_id
			name
			owner
			_spaceId
			order
		}
	}
`;

export const ADD_NEW_VIEWER_TO_PROJECT_MUTATION = gql`
	mutation addNewViewerToProject($addNewViewerInput: AddNewViewerInput!) {
		addNewViewerToProject(addNewViewerInput: $addNewViewerInput) {
			viewers
		}
	}
`;

export const REMOVE_VIEWER_FROM_PROJECT_MUTATION = gql`
	mutation removeViewerFromProject($removeViewerInput: RemoveViewerInput!) {
		removeViewerFromProject(removeViewerInput: $removeViewerInput) {
			viewers
		}
	}
`;
