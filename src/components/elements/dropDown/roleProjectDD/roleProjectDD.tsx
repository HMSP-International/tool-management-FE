import * as React from 'react';
import { Menu } from 'antd';
import { DropDownStyled, MenuStyled } from './roleProjectDD.styled';
import { useMutation } from '@apollo/client';
import { CHANGE_ROLE_OF_MEMBER_ON_PATICIPANT } from 'apis/paticipants/mutations';
// reudux
import { useDispatch } from 'react-redux';
import { updatePaticipant } from 'slices/paticipant/slice';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
interface IProps {
	currentRole: string;
	_projectId: string;
	_collaboratorId: string;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ currentRole, _projectId, _collaboratorId }) => {
	const [ onChangeRole, { loading } ] = useMutation(CHANGE_ROLE_OF_MEMBER_ON_PATICIPANT);
	const dispatch = useDispatch();

	const handlechangeRole = async (role: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeRole,
			variables: { changeRoleOfMemberInput: { _projectId, role, _collaboratorId } },
		});

		if (isError) {
			console.log(isError);
		}
		else {
			dispatch(updatePaticipant(data));
		}
	};

	if (loading) return <LoadingView />;

	const menu = (
		<MenuStyled>
			<Menu.Item className='menu-item'>
				<button onClick={() => handlechangeRole('member')}>member</button>
			</Menu.Item>
			<Menu.Item className='menu-item'>
				<button onClick={() => handlechangeRole('admin')}>admin</button>
			</Menu.Item>
		</MenuStyled>
	);

	return (
		<React.Fragment>
			<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
				<button className='container-icon' style={{ backgroundColor: 'lightgreen' }}>
					{currentRole}
				</button>
			</DropDownStyled>
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
