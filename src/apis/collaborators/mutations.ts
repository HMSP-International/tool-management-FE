import { gql } from '@apollo/client';

export const INVITE_SPACE_MUTAIION = gql`
	mutation INVITE_SPACE($inviteSpaceInput: InviteSpaceInput!) {
		inviteSpace(inviteSpaceInput: $inviteSpaceInput) {
			_adminId
			_id
			_memberId
			_workSpaceId
			confirmEmail
			role
		}
	}
`;
