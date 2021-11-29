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
