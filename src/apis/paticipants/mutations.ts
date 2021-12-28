import { gql } from '@apollo/client';

export const GET_USERS_BELONG_PROJECT_MUTAIION = gql`
	mutation getUsersBelongProject($getUsersBelongProjectInput: GetUsersBelongProjectInput!) {
		getUsersBelongProject(getUsersBelongProjectInput: $getUsersBelongProjectInput) {
			_id
			_collaboratorId {
				_id
				_memberId {
					_id
					_roleId {
						_id
					}
					avatar
					displayName
					email
					position
					title
				}
				_adminId
			}
			_projectId {
				_id
			}
			role
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

export const CHANGE_ROLE_OF_MEMBER_ON_PATICIPANT = gql`
	mutation changeRoleOfMemberOnPaticipant($changeRoleOfMemberInput: ChangeRoleOfMemberInput!) {
		changeRoleOfMemberOnPaticipant(changeRoleOfMemberInput: $changeRoleOfMemberInput) {
			_id
			_collaboratorId {
				_id
				_memberId {
					_id
					_roleId {
						_id
					}
					avatar
					displayName
					email
					position
					title
				}
			}
			_projectId {
				_id
			}
			role
		}
	}
`;
