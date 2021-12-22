import { gql } from '@apollo/client';

export const CHANGE_PASSWORD_MUTAIION = gql`
	mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
		chagePassword(changePasswordInput: $changePasswordInput) {
			_id
		}
	}
`;

export const CHANGE_INFORMATION_MUTAIION = gql`
	mutation ChangeInformation($changeInformationInput: ChangeInformationInput!) {
		chageInformation(changeInformationInput: $changeInformationInput) {
			_id
			displayName
			title
			department
			email
			position
			_roleId {
				name
				_id
			}
		}
	}
`;
