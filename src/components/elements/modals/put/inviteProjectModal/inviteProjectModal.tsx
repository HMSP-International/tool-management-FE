import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
// Styled Components
import { ShareModalStyled } from './inviteProjectModal.styled';
// Components
import ListUserDrawer from 'components/elements/drawers/listUserDrawer/listUserDrawer';
import LoadingView from 'components/shared/loadingView/loadingView';
import Image from 'components/shared/image/image';
// interfaces
import { IUser } from 'slices/dashboard/interfaces';
// graphql
import { GET_USERS_MUTATION } from 'apis/users/mutations';
import {
	GET_USERS_BELONG_PROJECT_MUTAIION,
	DELETE_PATICIPANT_MUTAIION,
	CREATE_PATICIPANT_MUTAIION,
} from 'apis/paticipants/mutations';
import { useMutation } from '@apollo/client';
// redux
import { useDispatch } from 'react-redux';
import { getUsers } from 'slices/dashboard/slice';
// helper
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';
import { useParams } from 'react-router-dom';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	nameProject: string;
}

const showText = (text: string) => {
	return <span>{text}</span>;
};

const ShareWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, nameProject }) => {
	const { _id: _projectId } = useParams();
	const [ inviteUsers, setInviteUsers ] = useState<IUser[]>([]);
	const [ onGetUsers, { loading: loadingGetUsers } ] = useMutation(GET_USERS_MUTATION);
	const [ onDeletePaticipant, { loading: loadingDeletePaticipant } ] = useMutation(DELETE_PATICIPANT_MUTAIION);
	const [ onCreatePaticiant, { loading: loadingCreatePaticipant } ] = useMutation(CREATE_PATICIPANT_MUTAIION);
	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);
	const dispatch = useDispatch();
	const [ showListUserDrawer, setShowListUserDrawer ] = useState(false);

	useEffect(
		() => {
			const fetchData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({ fnFetchData: onGetUsers });

				if (!isError) {
					dispatch(getUsers(data));
				}
			};

			fetchData();
		},
		[ onGetUsers, dispatch ],
	);

	useEffect(
		() => {
			const fetchData = async () => {
				if (!loadingGetUserBelongProject) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetUserBeLongProject,
						variables: { getUsersBelongProjectInput: { _projectId } },
					});

					if (!isError) {
						const users: IUser[] = data.map((user: any) => user._collaboratorId._memberId);

						setInviteUsers(users);
					}
				}
			};

			fetchData();
		},
		[ dispatch, onGetUserBeLongProject, loadingGetUserBelongProject, _projectId ],
	);

	if (loadingGetUserBelongProject || loadingGetUsers || loadingDeletePaticipant || loadingCreatePaticipant)
		return <LoadingView />;

	const handleRemoveUser = async (user: IUser) => {
		const newListUser = inviteUsers.filter(inviteUser => inviteUser._id !== user._id);
		setInviteUsers(newListUser);

		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeletePaticipant,
			variables:
				{
					deletePaticipantInput:
						{
							_memberId: user._id,
							_projectId,
						},
				},
		});

		if (isError) {
			setInviteUsers(inviteUsers);
		}
	};

	const handleClickEmail = async (user: IUser) => {
		setInviteUsers([ ...inviteUsers, user ]);

		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onCreatePaticiant,
			variables:
				{
					createPaticipantInput:
						{
							_projectId,
							role: 'member',
							_memberId: user._id,
						},
				},
		});

		if (isError) {
			setInviteUsers(inviteUsers);
		}
	};

	return (
		<React.Fragment>
			<ShareModalStyled centered visible={hidden} footer={null} className='modal__share-modal'>
				<div className='share-modal__header'>
					<div className='share-modal__header__title'>{'Share Project' + nameProject}</div>
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
							{/* <Tooltip placement='top' title={showText('me')}>
								<div>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg'
										alt=''
									/>
								</div>
							</Tooltip> */}
							{inviteUsers.map(user => (
								<div key={user._id}>
									<Tooltip placement='bottom' title={showText(user.email)}>
										<Image
											public_id={user.avatar}
											w={40}
											h={40}
											styles={{ borderRadius: '100rem' }}
										/>
									</Tooltip>
									<Tooltip placement='top' title={showText('delete')}>
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
						<button onClick={() => setHidden(false)}>Invite</button>
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
