import { gql } from '@apollo/client';

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
