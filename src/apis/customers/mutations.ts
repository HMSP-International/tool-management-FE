import { gql } from '@apollo/client';

export const CREATE_CUSTOMER_BY_ADMIN_MUTAIION = gql`
	mutation CreateCustomerByAdmin($createCustomerByAdminInput: CreateCustomerByAdminInput!) {
		createCustomerByAdmin(createCustomerByAdminInput: $createCustomerByAdminInput) {
			_id
			avatar
			email
			displayName
		}
	}
`;

export const GET_CUSTOMERS_MUTAIION = gql`
	mutation getCustomers {
		getCustomers {
			_id
			email
			displayName
			avatar
		}
	}
`;

export const DELETE_CUSTOMER_MUTATION = gql`
	mutation deleteCustomer($deleteCustomerInput: DeleteCustomerInput!) {
		deleteCustomer(deleteCustomerInput: $deleteCustomerInput) {
			_id
		}
	}
`;

export const CHANGE_PASSWORD_CUSTOMER_BY_ADMIN_MUTATION = gql`
	mutation chagePasswordOfCustomerByAdmin(
		$changePasswordOfCustomerByAdminInput: ChangePasswordOfCustomerByAdminInput!
	) {
		chagePasswordOfCustomerByAdmin(changePasswordOfCustomerByAdminInput: $changePasswordOfCustomerByAdminInput) {
			_id
		}
	}
`;

export const CHANGE_INFO_CUSTOMER_BY_ADMIN_MUTATION = gql`
	mutation chageInformationOfCustomerByAdmin(
		$changeInformationOfCustomerByAdminInput: ChangeInformationOfCustomerByAdminInput!
	) {
		chageInformationOfCustomerByAdmin(
			changeInformationOfCustomerByAdminInput: $changeInformationOfCustomerByAdminInput
		) {
			_id
			displayName
			email
			avatar
		}
	}
`;
