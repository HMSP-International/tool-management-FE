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

export const GET_SPACE_BY_MEMBER_ID_MUTATION = gql`
	mutation GetSpacesByMemberId($findByMemberId: FindByMemberId!) {
		getSpacesByMemberId(findByMemberId: $findByMemberId) {
			_id
			name
			order
		}
	}
`;

// export const PUT_INVITED_SPACES_MUTATION = gql`
// 	mutation putInvitedSpaces($putInvitedSpaceInput: PutInvitedSpaceInput!) {
// 		putInvitedSpaces(putInvitedSpaceInput: $putInvitedSpaceInput) {
// 			_id
// 		}
// 	}
// `;

export const CHANGE_NAME_SPACE_SPACE_MUTATION = gql`
	mutation ChangeNameSpace($changeNameSpaceInput: ChangeNameSpaceInput!) {
		changeNameSpace(changeNameSpaceInput: $changeNameSpaceInput) {
			_id
			name
			owner
			order
		}
	}
`;

export const DELETE_SPACE_MUTATION = gql`
	mutation DELETE_SPACE($deleteSpaceInput: DeleteSpaceInput!) {
		deleteSpaceById(deleteSpaceInput: $deleteSpaceInput) {
			_id
			owner
			name
			order
		}
	}
`;

export const ADD_NEW_VIEWER_TO_SPACE_MUTATION = gql`
	mutation addNewViewerToSpace($addNewViewerInput: AddNewViewerInput!) {
		addNewViewerToProject(addNewViewerInput: $addNewViewerInput) {
			viewers
		}
	}
`;

export const REMOVE_VIEWER_FROM_SPACE_MUTATION = gql`
	mutation removeViewerFromSpace($removeViewerInput: RemoveViewerInput!) {
		removeViewerFromProject(removeViewerInput: $removeViewerInput) {
			viewers
		}
	}
`;

export const GET_SPACE_BY_PROJECT_ID_MUTATION = gql`
	mutation getSpacesByProjectId($findByProjectId: FindByProjectId!) {
		getSpacesByProjectId(findByProjectId: $findByProjectId) {
			viewers
			_id
		}
	}
`;
