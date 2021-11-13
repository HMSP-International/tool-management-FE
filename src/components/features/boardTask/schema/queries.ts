import { gql } from '@apollo/client';

export const queries = {
	taskLists:
		gql`
			query ExampleQuery {
				getAllTaskList {
					_id
					name
				}
			}
		`,
};
