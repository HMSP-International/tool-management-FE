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
