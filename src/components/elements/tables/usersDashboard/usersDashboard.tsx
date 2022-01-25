import React from 'react';
// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';
// cell
import { Tooltip } from 'antd';
import DeleteAction from './action/delete';
import PutAction from './action/put';
// styled-component
import { TableUserStyled } from './usersDashboard.styled';
// interfaces
import { IInitialStateDashboard, IUser } from 'slices/dashboard/interfaces';
import { RootState } from 'global/redux/rootReducer';
// Redux
import { useSelector } from 'react-redux';
// components
import ImageLink from 'components/shared/image/imageLink';

const columns: TableColumn<IUser>[] = [
	{
		name: 'Avt',
		selector: row => row.avatar,
		sortable: true,
		center: true,
		cell:
			row => (
				<ImageLink
					w={50}
					h={50}
					public_id={row.avatar}
					link={'/dashboard/user/' + row._id}
					styles={{ cursor: 'pointer' }}
				/>
			),
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
		cell:
			row => {
				return (
					<Tooltip placement='top' title={row.email}>
						{row.email}
					</Tooltip>
				);
			},
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
		name: 'Role',
		selector: row => row._roleId.name,
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

const UsersDashboard: React.FC = () => {
	// redux
	const dashboardRedux: IInitialStateDashboard = useSelector((state: RootState) => state.dashboard);

	return (
		<TableUserStyled>
			<DataTable columns={columns} data={dashboardRedux.users} className='123' />
		</TableUserStyled>
	);
};

export default UsersDashboard;
