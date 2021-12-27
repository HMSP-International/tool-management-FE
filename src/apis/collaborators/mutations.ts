import { gql } from '@apollo/client';

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
				avatar
			}
		}
	}
`;

export const DELETE_BY_USER_AND_SPACE_MUTAIION = gql`
	mutation DELETE_BY_USER_AND_SPACE($deleteByUserAndSpaceInput: DeleteByUserAndSpaceInput!) {
		deleteByUserAndSpace(deleteByUserAndSpaceInput: $deleteByUserAndSpaceInput) {
			_id
			_workSpaceId {
				_id
			}
			_memberId {
				_id
			}
			_adminId
			role
			confirmEmail
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

export const VERIFY_INVITE_SPACE_MUTATION = gql`
	mutation VerifyInviteSpace($verifyInviteSpaceInput: VerifyInviteSpaceInput!) {
		verifyInviteSpace(verifyInviteSpaceInput: $verifyInviteSpaceInput) {
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
