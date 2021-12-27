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
