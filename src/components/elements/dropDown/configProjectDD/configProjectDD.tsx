import * as React from 'react';
import { Menu } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai';
// components
import { DropDownStyled, MenuStyled } from './configProjectDD.styled';

interface IProps {
	onCreateList: (T: boolean) => void;
	onDeleteProject: (T: boolean) => void;
	onInviteProject: (T: boolean) => void;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ onCreateList, onDeleteProject, onInviteProject }) => {
	const menu = (
		<MenuStyled>
			<Menu.Item className='menu-item'>
				<button onClick={() => onCreateList(true)}>Create List</button>
			</Menu.Item>
			<Menu.Item className='menu-item'>
				<button>Edit Project</button>
			</Menu.Item>
			<Menu.Item className='menu-item'>
				<button onClick={() => onInviteProject(true)}>Invite</button>
			</Menu.Item>
			<Menu.Item className='menu-item'>
				<button onClick={() => onDeleteProject(true)}>Delete Project</button>
			</Menu.Item>
		</MenuStyled>
	);

	return (
		<React.Fragment>
			<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
				<button className='container-icon'>
					<AiOutlineSetting />
				</button>
			</DropDownStyled>
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
