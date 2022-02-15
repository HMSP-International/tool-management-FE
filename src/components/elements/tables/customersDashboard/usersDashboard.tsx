import React from 'react';
// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';
// cell
import { Tooltip } from 'antd';
import DeleteAction from './action/delete';
import PutAction from './action/put';
// styled-component
import { TableCustomerStyled } from './usersDashboard.styled';
// interfaces
import { IInitialStateDashboard, ICustomerDashboard } from 'slices/dashboard/interfaces';
import { RootState } from 'global/redux/rootReducer';
// Redux
import { useSelector } from 'react-redux';
// components
import Image from 'components/shared/image/image';

const columns: TableColumn<ICustomerDashboard>[] = [
	{
		name: 'Avt',
		selector: row => row.avatar,
		sortable: true,
		center: true,
		cell: row => <Image w={50} h={50} public_id={row.avatar} />,
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
		name: 'Action',
		selector: row => row.action,
		sortable: true,
		center: true,
		cell:
			row => {
				return (
					<div style={{ display: 'flex' }}>
						<PutAction customer={row} />
						<DeleteAction customer={{ _id: row._id, email: row.email }} />
					</div>
				);
			},
	},
];

const CustomersDashboard: React.FC = () => {
	// redux
	const dashboardRedux: IInitialStateDashboard = useSelector((state: RootState) => state.dashboard);

	return (
		<TableCustomerStyled>
			<DataTable columns={columns} data={dashboardRedux.customers} />
		</TableCustomerStyled>
	);
};

export default CustomersDashboard;
