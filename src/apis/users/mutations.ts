import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
	mutation CreateUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			_id
			title
			position
			department
			role
			displayName
			password
			email
		}
	}
`;

export const DELETE_USER_MUTATION = gql`
	mutation DeleteUser($deleteUserInput: DeleteUserInput!) {
		deleteUser(deleteUserInput: $deleteUserInput) {
			_id
			displayName
			department
			position
			title
		}
	}
`;

export const CHANGE_INFORMATION_BY_ADMIN_MUTAIION = gql`
	mutation ChangeInformationByAdmin(
		$changeInformationInputByAdmin: ChangeInformationInputByAdmin!
	) {
		chageInformationByAdmin(changeInformationInputByAdmin: $changeInformationInputByAdmin) {
			_id
			displayName
			title
			department
			email
			position
		}
	}
`;

export const CHANGE_PASSWORD_BY_ADMIN_MUTAIION = gql`
	mutation ChangePasswordByAdmin($changePasswordInputByAdmin: ChangePasswordInputByAdmin!) {
		chagePasswordByAdmin(changePasswordInputByAdmin: $changePasswordInputByAdmin) {
			_id
		}
	}
`;

export const GET_USERS_MUTATION = gql`
	mutation Users {
		getUsers {
			_id
			department
			displayName
			email
			position
			role
			title
		}
	}
`;
