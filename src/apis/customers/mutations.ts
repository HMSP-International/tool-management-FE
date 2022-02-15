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
			avatar
			email
			displayName
		}
	}
`;

export const DELETE_CUSTOMER_MUTATION = gql`
	mutation deleteCustomer($deleteCustomerInput: DeleteCustomerInput!) {
		deleteCustomer(deleteCustomerInput: $deleteCustomerInput) {
			_id
			avatar
			email
			displayName
		}
	}
`;
