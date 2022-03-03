import { gql } from '@apollo/client';

export const GET_REVIEWS_MUTATION = gql`
	mutation getViewers {
		getViewers {
			_id
			_userId
			emails
		}
	}
`;

export const ADD_EMAIL_TO_VIEWER = gql`
	mutation addEmailToViewer($addNewEmail: AddNewEmailInput!) {
		addEmailToViewer(addNewEmail: $addNewEmail) {
			_id
			_userId
			emails
		}
	}
`;

export const REMOVE_EMAIL_FROM_VIEWER_MUTATION = gql`
	mutation removeEmailToViewer($removeEmail: RemoveEmailInput!) {
		removeEmailToViewer(removeEmail: $removeEmail) {
			_id
			_userId
			emails
		}
	}
`;
