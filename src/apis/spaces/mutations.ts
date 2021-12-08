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

export const INVITE_SPACES_MUTATION = gql`
	mutation INVITE_SPACE($inviteSpaceInput: InviteSpaceInput!) {
		inviteSpace(inviteSpaceInput: $inviteSpaceInput) {
			_adminId
			_id
			_memberId {
				displayName
				department
				position
				title
				email
				_id
			}
			_workSpaceId {
				_id
			}
			confirmEmail
			role
		}
	}
`;

export const PUT_INVITED_SPACES_MUTATION = gql`
	mutation putInvitedSpaces($putInvitedSpaceInput: PutInvitedSpaceInput!) {
		putInvitedSpaces(putInvitedSpaceInput: $putInvitedSpaceInput) {
			_id
		}
	}
`;

export const FIND_USERS_BY_SPACE_ID_MUTATION = gql`
	mutation findUsersBySpaceId($findUsersBySpaceId: FindUsersBySpaceId!) {
		findUsersBySpaceId(findUsersBySpaceId: $findUsersBySpaceId) {
			_id
			_memberId {
				_id
				displayName
				email
				department
				position
				title
			}
		}
	}
`;

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
