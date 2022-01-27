import React, { useEffect } from 'react';
// Component
import WorkSpace from './workSpace/workSpace';
import LoadingView from 'components/shared/loadingView/loadingView';
import { getListsFormatted } from 'slices/taskList/slice';
import { convertTaskList } from 'helpers/formatData/convertTaskList';
import { IList } from 'slices/taskList/interfaces';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { GET_LISTS_MUTATION } from 'apis/taskList/mutations';

const EmployeeDuties: React.FC = () => {
	const navigate = useNavigate();
	const params = {
		_projectId: '61f0f6c41649b5b6a4199604',
	};
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
									_projectId: params._projectId,
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
		[ navigate, dispatch, onGetLists, params._projectId ],
	);

	useEffect(
		() => {
			return () => {
				dispatch(getListsFormatted({}));
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ params._projectId ],
	);

	// render;
	if (loadingGetLists) {
		return <LoadingView />;
	}

	return <WorkSpace />;
};

export default EmployeeDuties;
