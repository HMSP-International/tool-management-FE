import { gql } from '@apollo/client';

export const queries = {
	taskLists:
		gql`
			query GetAllTaskList {
				taskLists {
					_id
					name
				}
			}
		`,
};
