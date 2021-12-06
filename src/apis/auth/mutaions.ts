import { gql } from '@apollo/client';

export const LOGIN_MUTAIION = gql`
	mutation SignIn($signinInput: SigninInput!) {
		signin(signinInput: $signinInput) {
			jwt
		}
	}
`;
