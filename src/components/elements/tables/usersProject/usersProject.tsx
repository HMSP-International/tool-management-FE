import React from 'react';
// table
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';
// cell
import { Tooltip } from 'antd';
import DeleteAction from './action/delete';
// styled-component
import { TableUserStyled } from './usersProject.styled';
import RoleProjectDD from 'components/elements/dropDown/roleProjectDD/roleProjectDD';
// interfaces
import { IInitialStatePaticipant, IPaticipant } from 'slices/paticipant/interfaces';
// helpers
import { removeAfterSign } from 'helpers/string/removeAfter@';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
// redux
import { RootState } from 'global/redux/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {}

const columns: TableColumn<IPaticipant>[] = [
	{
		name: 'Avt',
		selector: row => row._memberId.avatar,
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

				const myImage = cld.image(row._memberId.avatar);

				myImage.resize(fill().width(50).height(50));

				return <AdvancedImage cldImg={myImage} />;
			},
	},
	{
		name: 'Name',
		selector: row => row._memberId.displayName,
		sortable: true,
		center: true,
	},
	{
		name: 'Email',
		selector: row => row._memberId.email,
		sortable: true,
		center: true,
		cell:
			row => {
				return (
					<Tooltip placement='top' title={row._memberId.email}>
						{removeAfterSign(row._memberId.email)}
					</Tooltip>
				);
			},
	},
	{
		name: 'Position',
		selector: row => row._memberId.position,
		sortable: true,
		center: true,
	},
	{
		name: 'Title',
		selector: row => row._memberId.title,
		sortable: true,
		center: true,
	},
	{
		name: 'Role',
		selector: row => row.role,
		sortable: true,
		center: true,
		cell:
			row => {
				return (
					<RoleProjectDD
						currentRole={row.role}
						_collaboratorId={row._collaboratorId._id}
						_projectId={row._projectId._id}
					/>
				);
			},
	},
	{
		name: 'Action',
		selector: row => row.role,
		sortable: true,
		center: true,
		cell:
			row => {
				return (
					<div style={{ display: 'flex' }}>
						<DeleteAction user={row._collaboratorId._memberId} _projectId={row._projectId._id} />
					</div>
				);
			},
	},
];

const UsersProject: React.FC<IProps> = () => {
	// redux
	const paticipantRedux: IInitialStatePaticipant = useSelector((state: RootState) => state.paticipant);

	return (
		<TableUserStyled>
			<DataTable columns={columns} data={paticipantRedux.paticipants} />
		</TableUserStyled>
	);
};

export default UsersProject;
