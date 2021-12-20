import { OperationVariables, MutationFunctionOptions, DefaultContext, ApolloCache } from '@apollo/client';
// import { handleApolloError } from './apolloError';
// import { openNotification } from './notification';

import { ApolloError } from '@apollo/client';
import { notification } from 'antd';

export const openNotification = (
	{ title, extensions = [] }: { title: string; extensions: any },
	err: Boolean = false,
) => {
	// console.log(extensions);

	const description =
		extensions.length === 0
			? ''
			: extensions.reduce((result: string, message: string) => {
					return result + ' and ' + message;
				});

	const sender = {
		message: title,
		description,
	};

	if (err) {
		notification.warn(sender);
	}
	else {
		notification.success(sender);
	}
};

export const handleApolloError = (error: unknown): { title: string; extensions: string[] } => {
	const apolloError = error as ApolloError;
	const { graphQLErrors } = apolloError;

	let extensions: any = [];

	if (graphQLErrors.length > 0) {
		if (typeof graphQLErrors[0].extensions === 'string') {
			extensions.push(graphQLErrors[0].extensions);
		}
		else {
			extensions = graphQLErrors[0].extensions;
		}
		return {
			title: graphQLErrors[0].message,
			extensions,
		};
	}
	else {
		return {
			title: apolloError.message,
			extensions: [ apolloError.message ],
		};
	}
};

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
