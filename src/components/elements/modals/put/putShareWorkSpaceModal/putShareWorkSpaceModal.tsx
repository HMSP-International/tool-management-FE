import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
// Styled Components
import { ShareModalStyled } from './putShareWorkSpaceModal.styled';
// Components
import ListUserDrawer from '../../../drawers/listUserDrawer/listUserDrawer';
import LoadingView from '../../../../shared/loadingView/loadingView';
// interfaces
import { IUser } from 'slices/dashboard/interfaces';
import { ISpace } from 'slices/space/interfaces';
// graphql
import { GET_USERS_MUTATION } from '../../../../../apis/users/mutations';
import { PUT_INVITED_SPACES_MUTATION, FIND_USERS_BY_SPACE_ID_MUTATION } from '../../../../../apis/spaces/mutations';
import { useMutation } from '@apollo/client';
// redux
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../../slices/dashboard/slice';
// helper
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onBack(): void;
	currentSpace: ISpace;
	nameSpace: string;
}

const showText = (text: string) => {
	return <span>{text}</span>;
};

const ShareWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onBack, currentSpace, nameSpace }) => {
	const [ inviteUsers, setInviteUsers ] = useState<IUser[]>([]);
	const [ onGetUsers, { loading: loadingGetUsers } ] = useMutation(GET_USERS_MUTATION);
	const [ onPutInvitedSpace, { loading: loadingPutInvitedSpaces } ] = useMutation(PUT_INVITED_SPACES_MUTATION);

	const [ onFindUSersBySpace, { loading: loadinginvitedUsers } ] = useMutation(FIND_USERS_BY_SPACE_ID_MUTATION);

	const dispatch = useDispatch();
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

	useEffect(
		() => {
			const fetchUsers = async () => {
				if (!loadinginvitedUsers) {
					const { data } = await onFindUSersBySpace({
						variables:
							{
								findUsersBySpaceId:
									{
										_spaceId: currentSpace._id,
									},
							},
					});

					const users: IUser[] = data.findUsersBySpaceId.map((user: any) => user._memberId);

					setInviteUsers(users);
				}
			};

			fetchUsers();
		},
		[ dispatch, onFindUSersBySpace, loadinginvitedUsers, currentSpace ],
	);

	if (loadinginvitedUsers || loadingGetUsers || loadingPutInvitedSpaces) return <LoadingView />;

	const handleSubmit = async () => {
		const _memberIds = inviteUsers.map(user => user._id);

		await fetchDataAndShowNotify({
			fnFetchData: onPutInvitedSpace,
			variables:
				{
					putInvitedSpaceInput:
						{
							_workSpaceId: currentSpace._id,
							_memberIds,
						},
				},
			message: 'Edited Space user',
		});
	};

	const handleRemoveUser = (user: IUser) => {
		const newListUser = inviteUsers.filter(inviteUser => inviteUser._id !== user._id);

		setInviteUsers(newListUser);
	};

	return (
		<React.Fragment>
			<ShareModalStyled centered visible={hidden} footer={null} className='modal__share-modal'>
				<div className='share-modal__header'>
					<div className='share-modal__header__back' onClick={onBack}>
						{'<'}
					</div>
					<div className='share-modal__header__title'>{'Share ' + nameSpace}</div>
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
							<Tooltip placement='top' title={showText('me')}>
								<div>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg'
										alt=''
									/>
								</div>
							</Tooltip>
							{inviteUsers.map(user => (
								<div key={user._id}>
									<Tooltip placement='bottom' title={showText(user.email)}>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg'
											alt=''
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
						<button onClick={handleSubmit}>Update Space</button>
					</div>
				</div>
			</ShareModalStyled>

			{showListUserDrawer && (
				<ListUserDrawer
					hidden={showListUserDrawer}
					setHidden={setShowListUserDrawer}
					inviteUsers={inviteUsers}
					setInviteUsers={setInviteUsers}
				/>
			)}
		</React.Fragment>
	);
};

export default ShareWorkSpaceModal;
