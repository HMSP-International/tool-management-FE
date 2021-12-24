import { gql } from '@apollo/client';

export const GET_USERS_BELONG_PROJECT_MUTAIION = gql`
	mutation GET_USERS_BELONG_PROJECT($getUsersBelongProjectInput: GetUsersBelongProjectInput!) {
		getUsersBelongProject(getUsersBelongProjectInput: $getUsersBelongProjectInput) {
			_collaboratorId {
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
	}
`;

export const DELETE_PATICIPANT_MUTAIION = gql`
	mutation DELETE_PATICIPANT($deletePaticipantInput: DeletePaticipantInput!) {
		deletePaticipant(deletePaticipantInput: $deletePaticipantInput) {
			_id
		}
	}
`;

export const CREATE_PATICIPANT_MUTAIION = gql`
	mutation CREATE_PATICIPANT($createPaticipantInput: CreatePaticipantInput!) {
		createPaticipant(createPaticipantInput: $createPaticipantInput) {
			_id
			displayName
			email
			department
			position
			title
			avatar
		}
	}
`;
