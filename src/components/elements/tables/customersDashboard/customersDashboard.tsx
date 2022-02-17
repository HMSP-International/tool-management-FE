	import React, { useState } from 'react';
// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';
// cell
import { Tooltip } from 'antd';
import DeleteAction from './action/delete';
import PutAction from './action/put';
// components
import { TableCustomerStyled } from './customersDashboard.styled';
import ManageProjectForCustomer from './modals/manageProject';
// interfaces
import { IInitialStateDashboard, ICustomerDashboard } from 'slices/dashboard/interfaces';
import { RootState } from 'global/redux/rootReducer';
// Redux
import { useSelector } from 'react-redux';
// components
import Image from 'components/shared/image/image';

const CustomersDashboard: React.FC = () => {
	const columns: TableColumn<ICustomerDashboard>[] = [
		{
			name: 'Avt',
			selector: row => row.avatar,
			sortable: true,
			center: true,
			cell:
				row => (
					<Image
						w={50}
						h={50}
						public_id={row.avatar}
						styles={{ cursor: 'pointer', borderRadius: '100rem' }}
						onClick={() => handleOpenModel(row)}
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

	const [ isShowModal, setIsShowModal ] = useState(false);
	const [ currentCustomer, setCurrentCustomer ] = useState<ICustomerDashboard>({
		_id: '',
		avatar: '',
		email: '',
		displayName: '',
		action: '',
	});
	// redux
	const dashboardRedux: IInitialStateDashboard = useSelector((state: RootState) => state.dashboard);
	// event
	const handleOpenModel = (customer: ICustomerDashboard) => {
		setCurrentCustomer(customer);
		setIsShowModal(true);
	};

	return (
		<React.Fragment>
			<TableCustomerStyled>
				<DataTable columns={columns} data={dashboardRedux.customers} />
			</TableCustomerStyled>

			{isShowModal && (
				<ManageProjectForCustomer hidden={isShowModal} setHidden={setIsShowModal} customer={currentCustomer} />
			)}
		</React.Fragment>
	);
};

export default CustomersDashboard;
