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
import { IInitialStateDashboard, IUser } from '../../../../slices/dashboard/interfaces';
import { RootState } from '../../../../global/redux/rootReducer';
// Redux
import { useSelector } from 'react-redux';
// helpers
import { removeAfterSign } from 'helpers/string/removeAfter@';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const columns: TableColumn<IUser>[] = [
	{
		name: 'Avt',
		selector: row => row.avatar,
		sortable: true,
		center: true,
		cell:
			row => {
				const cld = new Cloudinary({
					cloud:
						{
							cloudName: 'hmsp-com',
						},
				});

				const myImage = cld.image(row.avatar);

				myImage.resize(fill().width(50).height(50));

				return <AdvancedImage cldImg={myImage} />;
			},
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
						{removeAfterSign(row.email)}
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
