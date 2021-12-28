import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai';
// components
import { DropDownStyled, MenuStyled } from './configProjectDD.styled';
import { IInitialStateUser } from 'slices/user/interfaces';
import { IInitialStateProject } from 'slices/project/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';

interface IProps {
	onCreateList: (T: boolean) => void;
	onDeleteProject: (T: boolean) => void;
	onInviteProject: (T: boolean) => void;
	_projectId: string;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ onCreateList, onDeleteProject, onInviteProject, _projectId }) => {
	const navigate = useNavigate();
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);

	const menu = (
		<MenuStyled>
			{project.owner === userRedux.profile._id && (
				<React.Fragment>
					<Menu.Item className='menu-item'>
						<button onClick={() => navigate(`/manage/${_projectId}`)}>Tasks</button>
					</Menu.Item>
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
						<button onClick={() => navigate(`/manage/${_projectId}/roles`)}>Roles</button>
					</Menu.Item>
					<Menu.Item className='menu-item'>
						<button onClick={() => onDeleteProject(true)}>Delete Project</button>
					</Menu.Item>
				</React.Fragment>
			)}
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
