import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
// component
import WorkSpace from './workSpace/workSpace';
import LoadingView from '../../shared/loadingView/loadingView';
// interfaces
import { IList } from 'slices/taskList/interfaces';
// graphql
import { GET_LISTS_MUTATION } from 'apis/taskList/mutations';
// helpers
import { convertTaskList } from 'helpers/formatData/convertTaskList';
// redux
import { useDispatch } from 'react-redux';
import { getListsFormatted } from 'slices/taskList/slice';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

const Manage: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();

	// redux
	const dispatch = useDispatch();

	// fetch data
	const [ onGetLists, { loading: loadingGetLists } ] = useMutation(GET_LISTS_MUTATION);

	// use effect
	useEffect(
		() => {
			if (loadingGetLists) return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetLists,
					variables:
						{
							getListsInput:
								{
									_projectId: params._id,
								},
						},
					isNotShowNotify: true,
				});

				if (isError) {
					navigate('/notFound');
				}
				else {
					const lists: IList[] = data;
					const formatted = convertTaskList(lists);
					dispatch(getListsFormatted(formatted));
				}
			};

			getData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ navigate, dispatch, onGetLists, params._id ],
	);

	useEffect(
		() => {
			return () => {
				dispatch(getListsFormatted({}));
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ params._id ],
	);

	// render;
	if (loadingGetLists) {
		return <LoadingView />;
	}

	return <WorkSpace />;
};

export default Manage;
