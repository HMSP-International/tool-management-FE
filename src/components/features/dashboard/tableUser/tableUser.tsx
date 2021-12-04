import React from 'react';

// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';

// cell
import DeleteAction from './action/delete';
import PutAction from './action/put';
// styled-component
import { TableUserStyled } from './tableUser.styled';

// interfaces
import { IInitialStateDashboard, IUser } from '../../../../slices/dashboard/interfaces';
import { RootState } from '../../../../global/redux/rootReducer';
// Redux
import { useSelector } from 'react-redux';

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
	const dashboardRedux: IInitialStateDashboard = useSelector(
		(state: RootState) => state.dashboard,
	);

	return (
		<TableUserStyled>
			<DataTable columns={columns} data={dashboardRedux.users} />
		</TableUserStyled>
	);
};

export default TableUser;
