import React, { useEffect } from 'react';

// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';

// cell
import DeleteAction from './action/delete';
import PutAction from './action/put';
// styled-component
import { TableUserStyled } from './tableUser.styled';

// interfaces
import { IInitialStateDashboard, IUser } from '../../../../features/dashboard/interfaces';
import { RootState } from '../../../../app/rootReducer';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../features/dashboard/slice';

// Graphql
import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../graphql/queries';
// components
import LoadingView from '../../../shared/loadingView/loadingView';
import ErrorView from '../../../shared/errorView/errorView';

const columns: TableColumn<IUser>[] = [
	{
		name: 'Avt',
		selector: row => row.avt,
		sortable: true,
		center: true,
	},
	{
		name: 'Name',
		selector: row => row.displayName,
		sortable: true,
		center: true,
	},
	{
		name: 'Email',
		selector: row => row.email,
		sortable: true,
		center: true,
	},
	{
		name: 'Department',
		selector: row => row.department,
		sortable: true,
		center: true,
	},
	{
		name: 'Position',
		selector: row => row.position,
		sortable: true,
		center: true,
	},
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
		center: true,
	},
	{
		name: 'Action',
		selector: row => row.action,
		sortable: true,
		center: true,
		cell:
			row => {
				return (
					<div style={{ display: 'flex' }}>
						<PutAction user={row} />
						<DeleteAction user={{ _id: row._id, email: row.email }} />
					</div>
				);
			},
	},
];

const TableUser: React.FC = () => {
	// redux
	const dispatch = useDispatch();
	const dashboardRedux: IInitialStateDashboard = useSelector(
		(state: RootState) => state.dashboard,
	);

	// Graphql
	const { data, error, loading } = useQuery(GET_USERS_QUERY);

	// useEffect
	useEffect(
		() => {
			if (!loading) {
				const users: IUser[] = data.getUsers;

				dispatch(getUsers(users));
			}
		},
		[ dispatch, loading, data ],
	);

	if (loading) return <LoadingView />;
	else if (error) return <ErrorView error={error} />;

	return (
		<TableUserStyled>
			<DataTable columns={columns} data={dashboardRedux.users} />
		</TableUserStyled>
	);
};

export default TableUser;
