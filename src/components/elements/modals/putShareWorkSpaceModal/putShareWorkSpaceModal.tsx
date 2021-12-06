import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
// Styled Components
import { ShareModalStyled } from './putShareWorkSpaceModal.styled';
// Components
import ListUserDrawer from '../../drawers/listUserDrawer/listUserDrawer';
import LoadingView from '../../../shared/loadingView/loadingView';
import ErrorView from '../../../shared/errorView/errorView';
// interfaces
import { IUser } from 'slices/dashboard/interfaces';
import { ISpace } from 'slices/space/interfaces';
import { ICollaborator } from 'slices/collaborator/interfaces';
// graphql
import { GET_USERS_MUTATION } from '../../../../apis/users/mutations';
import { FIND_USERS_BY_SPACE_ID_QUERY } from '../../../../apis/spaces/queries';
import { useMutation, useQuery } from '@apollo/client';
// redux
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../slices/dashboard/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onBack(): void;
	currentSpace: ISpace;
}

const showText = (text: string) => {
	return <span>{text}</span>;
};

const ShareWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onBack, currentSpace }) => {
	const [ inviteUsers, setInviteUsers ] = useState<IUser[]>([]);
	const [ onGetUsers, { loading: loadingGetUsers } ] = useMutation(GET_USERS_MUTATION);
	const {
		data: dataInvitedUsers,
		errorInvitedSpace,
		loading: loadinginvitedUsers,
	} = useQuery(FIND_USERS_BY_SPACE_ID_QUERY, {
		variables:
			{
				findUsersBySpaceId:
					{
						_spaceId: currentSpace._id,
					},
			},
	});

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
			if (!loadinginvitedUsers) {
				console.log();
				
				const users = dataInvitedUsers.findUsersBySpaceId.map(
					(collaborator: ICollaborator) => collaborator._memberId,
				);

				setInviteUsers(users);
			}
		},
		[ dispatch, dataInvitedUsers, loadinginvitedUsers ],
	);

	if (loadinginvitedUsers || loadingGetUsers) return <LoadingView />;
	if (errorInvitedSpace) return <ErrorView error={errorInvitedSpace} />;

	const handleSubmit = async () => {
		// Create Space
		console.log('submit');

		// send email to comfirm
	};

	return (
		<React.Fragment>
			<ShareModalStyled centered visible={hidden} footer={null} className='modal__share-modal'>
				<div className='share-modal__header'>
					<div className='share-modal__header__back' onClick={onBack}>
						{'<'}
					</div>
					<div className='share-modal__header__title'>{'Share ' + currentSpace.name}</div>
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
							<Tooltip placement='top' title={showText('pham duc huy')}>
								<div>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
							</Tooltip>
							{inviteUsers.map(user => (
								<Tooltip placement='top' title={showText(user.email)} key={user._id}>
									<div>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
											alt=''
										/>
									</div>
								</Tooltip>
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
					setInviteUsers={setInviteUsers}
				/>
			)}
		</React.Fragment>
	);
};

export default ShareWorkSpaceModal;
