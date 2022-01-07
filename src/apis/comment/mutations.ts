import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($createCommentInput: CreateCommentInput!) {
		createComment(createCommentInput: $createCommentInput) {
			_id
			_userId {
				_id
				avatar
				displayName
				email
			}
			content
			_taskId {
				_listId
				_id
			}
		}
	}
`;
