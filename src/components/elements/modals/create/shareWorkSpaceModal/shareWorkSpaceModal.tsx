import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
// Styled Components
import { ShareModalStyled } from './shareWorkSpaceModal.styled';
// Components
import ListUserDrawer from 'components/elements/drawers/listUserDrawer/listUserDrawer';
import LoadingView from 'components/shared/loadingView/loadingView';
import Image from 'components/shared/image/image';
// interfaces
import { IUser } from 'slices/dashboard/interfaces';
// graphql
import { GET_USERS_MUTATION } from 'apis/users/mutations';
import { useMutation } from '@apollo/client';
import { INVITE_SPACES_MUTATION } from 'apis/collaborators/mutations';
import { CREATE_SPACE_MUTATION } from 'apis/spaces/mutations';
// redux
import { useDispatch } from 'react-redux';
import { getUsers } from 'slices/dashboard/slice';
import { getSpaces } from 'slices/space/slice';
// interfaces
import { ISpace } from 'slices/space/interfaces';
// error
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { convertProject } from 'helpers/formatData/convertProject';
import { createProject } from 'slices/project/slice';
import { IProject } from 'slices/project/interfaces';
import { CREATE_PROJECT_MUTATION } from 'apis/projects/mutations';
import { CREATE_LIST_MUTATION } from 'apis/taskList/mutations';
import { convertTaskList } from 'helpers/formatData/convertTaskList';
import { createNewList } from 'slices/taskList/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onBack(): void;
	nameSpace: string;
}

const showText = (text: string) => {
	return <span>{text}</span>;
};

const ShareWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onBack, nameSpace }) => {
	// state
	const [ inviteUsers, setInviteUsers ] = useState<IUser[]>([]);
	// graphql
	const [ onGetUsers, { loading: loadingGetUsers } ] = useMutation(GET_USERS_MUTATION);
	const [ onCreateList, { loading: loadingCreateList } ] = useMutation(CREATE_LIST_MUTATION);
	const [ onCreateSpace, { loading: loadingCreateSpace } ] = useMutation(CREATE_SPACE_MUTATION);
	const [ onInviteSpace, { loading: loadingInviteSpace } ] = useMutation(INVITE_SPACES_MUTATION);
	const [ onCreateProject, { loading: loadingCreateProject } ] = useMutation(CREATE_PROJECT_MUTATION);
	// redux
	const dispatch = useDispatch();
	// drawer
	const [ showListUserDrawer, setShowListUserDrawer ] = useState(false);

	useEffect(
		() => {
			const fetchUsers = async () => {
				const { data } = await onGetUsers();

				dispatch(getUsers(data.getUsers));
			};

			fetchUsers();
		},
		[ onGetUsers, dispatch ],
	);

	if (loadingGetUsers || loadingCreateSpace || loadingInviteSpace || loadingCreateProject || loadingCreateList)
		return <LoadingView />;

	const handleSubmit = async () => {
		// Create Space
		const newSpace = await handleSubmitShareModal(inviteUsers);
		if (!newSpace) return;
		// auto create project Design -> Marketing -> IT
		handleAutoCreateProject([ 'Design', 'Marketing', 'IT' ], newSpace._id);
		// auto create list ToDo -> Doing -> Review -> Done -> Pending

		// close modal
		setHidden(false);
	};

	const handleSubmitShareModal = async (inviteUsers: IUser[]) => {
		const { data: spaces, isError } = await fetchDataAndShowNotify({
			fnFetchData: onCreateSpace,
			variables:
				{
					createSpaceInput:
						{
							name: nameSpace,
						},
				},
			message: 'Created space',
		});

		if (!isError) {
			dispatch(getSpaces(spaces));

			const newSpace: ISpace[] = spaces.filter((space: ISpace) => space.name === nameSpace);
			handleVerifyInviteSpace(inviteUsers, newSpace);

			return newSpace[0];
		}
	};

	const handleVerifyInviteSpace = async (inviteUsers: IUser[], newSpace: ISpace[]) => {
		if (newSpace.length >= 1) {
			const _workSpaceId = newSpace[0]._id;
			const role = 'MEMBER';

			for (let i = 0; i < inviteUsers.length; i++) {
				await onInviteSpace({
					variables:
						{
							inviteSpaceInput:
								{
									_workSpaceId,
									role,
									_memberId: inviteUsers[i]._id,
								},
						},
				});
			}
		}
	};

	const handleClickEmail = (user: IUser) => {
		setInviteUsers([ ...inviteUsers, user ]);
	};

	const handleRemoveUser = (user: IUser) => {
		const newListUser = inviteUsers.filter(inviteUser => inviteUser._id !== user._id);
		setInviteUsers(newListUser);
	};

	const handleAutoCreateProject = async (nameProject: string[], _spaceId: string) => {
		for (let name of nameProject) {
			const { data, isError } = await fetchDataAndShowNotify({
				fnFetchData: onCreateProject,
				variables:
					{
						createProjectInput:
							{
								name,
								_spaceId,
							},
					},
			});

			if (!isError) {
				const project: IProject = data;
				const newProjects = convertProject([ project ]);
				dispatch(createProject(newProjects));

				// auto create list ToDo -> Doing -> Review -> Done -> Pending
				handleCreateList([ 'To Do', 'Doing', 'Review', 'Done', 'Pending' ], project._id);
			}
		}
	};

	const handleCreateList = async (names: string[], _projectId: string) => {
		for (let name of names) {
			const { isError, data } = await fetchDataAndShowNotify({
				fnFetchData: onCreateList,
				variables:
					{
						createListInput:
							{
								_projectId,
								name,
							},
					},
			});

			if (!isError) {
				const list = convertTaskList([ data ]);
				dispatch(createNewList(list));
			}
		}
	};

	return (
		<React.Fragment>
			<ShareModalStyled centered visible={hidden} footer={null} className='modal__share-modal'>
				<div className='share-modal__header'>
					<div className='share-modal__header__back' onClick={onBack}>
						{'<'}
					</div>
					<div className='share-modal__header__title'>{'Share Space ' + nameSpace}</div>
					<div className='share-modal__header__close' onClick={() => setHidden(false)}>
						{'X'}
					</div>
				</div>
				<div className='share-modal__body'>
					<div className='share-modal__option'>
						<div className='share-modal__option__private'>
							<img
								src='https://cdn.w600.comps.canstockphoto.com/private-stamp-eps-vector_csp6202764.jpg'
								alt=''
							/>
							<div>Private</div>
						</div>
					</div>
					<div className='share-modal__shared'>
						<div className='share-modal__shared__text'>Share only with:</div>
						<div className='share-modal__shared__img'>
							{/* <Tooltip placement='top' title={showText('Me')}>
								<div>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
							</Tooltip> */}
							{inviteUsers.map(user => (
								<div key={user._id}>
									<Image public_id={user.avatar} w={40} h={40} styles={{ borderRadius: '100rem' }} />

									<Tooltip placement='top' title={showText('delete ' + user.email)}>
										<span className='close' onClick={() => handleRemoveUser(user)}>
											x
										</span>
									</Tooltip>
								</div>
							))}
						</div>
						<div className='share-modal__shared__add' onClick={() => setShowListUserDrawer(true)}>
							Add people
						</div>
					</div>
					<div className='share-modal__btn'>
						<button onClick={handleSubmit}>Create Space</button>
					</div>
				</div>
			</ShareModalStyled>

			{showListUserDrawer && (
				<ListUserDrawer
					hidden={showListUserDrawer}
					setHidden={setShowListUserDrawer}
					inviteUsers={inviteUsers}
					onClickUser={handleClickEmail}
				/>
			)}
		</React.Fragment>
	);
};

export default ShareWorkSpaceModal;