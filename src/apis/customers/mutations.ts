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
