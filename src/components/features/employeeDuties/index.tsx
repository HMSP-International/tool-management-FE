import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import WorkSpace from './workSpace/workSpace';
import LoadingView from 'components/shared/loadingView/loadingView';
import { getListsFormatted } from 'slices/taskList/slice';
import { convertTaskList } from 'helpers/formatData/convertTaskList';
import { IList } from 'slices/taskList/interfaces';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// graphql
import { useMutation } from '@apollo/client';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_LISTS_MUTATION } from 'apis/taskList/mutations';
import { IInitialStateEmployeeDuties } from 'slices/employeeDuties/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { setProject, setSpace } from 'slices/employeeDuties/slice';
import { PROJECT_DEFAULT, SPACE_DEFAULT } from 'slices/employeeDuties/initialState';
// routes
import { mainRouterPage } from 'global/routes/page';

const EmployeeDuties: React.FC = () => {
	const navigate = useNavigate();
	const employeeDutiesRedux: IInitialStateEmployeeDuties = useSelector((state: RootState) => state.employeeDuties);

	// redux
	const dispatch = useDispatch();

	// fetch data
	const [ onGetLists, { loading: loadingGetLists } ] = useMutation(GET_LISTS_MUTATION);

	// use effect
	useEffect(
		() => {
			if (loadingGetLists || employeeDutiesRedux.project.value === '-1') return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetLists,
					variables: { getListsInput: { _projectId: employeeDutiesRedux.project.value } },
					isNotShowNotify: true,
				});

				if (isError) {
					navigate(`/${mainRouterPage.notFound}`);
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
		[ navigate, dispatch, onGetLists, employeeDutiesRedux.project.value ],
	);

	useEffect(
		() => {
			return () => {
				dispatch(getListsFormatted({}));
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ employeeDutiesRedux.project.value ],
	);

	useEffect(
		() => {
			return () => {
				dispatch(setProject(PROJECT_DEFAULT));
				dispatch(setSpace(SPACE_DEFAULT));
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	// render;
	if (loadingGetLists) {
		return <LoadingView />;
	}

	return <WorkSpace />;
};

export default EmployeeDuties;
