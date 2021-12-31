import { OperationVariables, MutationFunctionOptions, DefaultContext, ApolloCache } from '@apollo/client';
import { handleApolloError } from './apolloError';
import { openNotification } from '../toastify/notification';

interface IParameters {
	fnFetchData: (
		options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
	) => Promise<any>;
	variables?: OperationVariables;
	message?: string;
	isNotShowNotify?: boolean;
}

interface IOutPut {
	isError: boolean;
	data: any;
}

export const fetchDataAndShowNotify = async (params: IParameters): Promise<IOutPut> => {
	const { fnFetchData, variables, message, isNotShowNotify } = params;
	try {
		const { data } = await fnFetchData({ variables });

		if (message) {
			const showing = {
				title: 'Susscess',
				extensions: [ message ],
			};
			if (!isNotShowNotify) {
				openNotification(showing);
			}
		}

		const keys = Object.keys(data);
		return { isError: false, data: data[keys[0]] };
	} catch (error) {
		if (!isNotShowNotify) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
		}
		return { isError: true, data: null };
	}
};
