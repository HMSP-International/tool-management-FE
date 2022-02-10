import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai';
// components
import CreateListModal from 'components/elements/modals/create/createListModal/createListModal';
import InviteProjectModal from 'components/elements/modals/put/inviteProjectModal/inviteProjectModal';
import ChangeProjectModal from 'components/elements/modals/put/changeProjectModal/changeProjectModal';
import DeleteProjectModal from 'components/elements/modals/delete/deleteProjectModal/deleteProjectModal';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
// interface
import { DropDownStyled, MenuStyled } from './configProjectDD.styled';
import { IInitialStateProject } from 'slices/project/interfaces';
// routes
import { mainRouterPage } from 'global/routes/page';

interface IProps {}

const WorkSpaceDropDown: React.FC<IProps> = () => {
	// router
	const navigate = useNavigate();
	// state
	const [ showCreateList, setShowCreateList ] = useState(false);
	const [ showChangeProject, setShowChangeProject ] = useState(false);
	const [ showDeleteProject, setShowDeleteProject ] = useState(false);
	const [ showInviteProject, setShowInviteProject ] = useState(false);
	// redux
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);

	const menu = (
		<MenuStyled>
			<React.Fragment>
				<Menu.Item className='menu-item' key='1'>
					<button onClick={() => navigate(`/${mainRouterPage.manage.index}/${project._id}`)}>Tasks</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key='2'>
					<button onClick={() => setShowCreateList(true)}>Create List</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key='3'>
					<button onClick={() => setShowChangeProject(true)}>Edit Project</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key='4'>
					<button onClick={() => setShowInviteProject(true)}>Invite</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key='5'>
					<button onClick={() => navigate(`/${mainRouterPage.manage.index}/${project._id}/roles`)}>
						Roles
					</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key='6'>
					<button onClick={() => setShowDeleteProject(true)}>Delete Project</button>
				</Menu.Item>
			</React.Fragment>
		</MenuStyled>
	);

	return (
		<React.Fragment>
			<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
				<button className='container-icon'>
					<AiOutlineSetting />
				</button>
			</DropDownStyled>

			{showCreateList && <CreateListModal hidden={showCreateList} setHidden={setShowCreateList} />}

			{showChangeProject && (
				<ChangeProjectModal
					hidden={showChangeProject}
					setHidden={setShowChangeProject}
					projectId={project._id}
				/>
			)}

			{showDeleteProject && <DeleteProjectModal hidden={showDeleteProject} setHidden={setShowDeleteProject} />}

			{showInviteProject && (
				<InviteProjectModal
					hidden={showInviteProject}
					setHidden={setShowInviteProject}
					nameProject={project.name}
				/>
			)}
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
