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

export const DELETE_COMMENT_MUTATION = gql`
	mutation deleteCommentById($deleteCommentInput: DeleteCommentInput!) {
		deleteCommentById(deleteCommentInput: $deleteCommentInput) {
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

export const CHANGE_COMMENT_BY_COMMENTID_MUTATION = gql`
	mutation changeContentByCommentId($putChangeCommentInput: PutChangeCommentInput!) {
		changeContentByCommentId(putChangeCommentInput: $putChangeCommentInput) {
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
