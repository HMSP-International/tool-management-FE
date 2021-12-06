import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
// Redux
import { useSelector } from 'react-redux';
// css
import { ListUserDrawerStyled } from './listUserDrawer.styled';
// interfaces
import { RootState } from '../../../../global/redux/rootReducer';
import { IInitialStateDashboard, IUser } from '../../../../slices/dashboard/interfaces';
import { IInitialStateAuth } from '../../../../slices/auth/interfaces';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	inviteUsers: IUser[];
	setInviteUsers(users: IUser[]): void;
}

interface IJWTDecode {
	_id: string;
}

const ListUserDrawer: React.FC<IProps> = ({ hidden, setHidden, setInviteUsers, inviteUsers }) => {
	const authRedux: IInitialStateAuth = useSelector((state: RootState) => state.auth);
	const dashboardRedux: IInitialStateDashboard = useSelector((state: RootState) => state.dashboard);
	const [ listUser, setListUSer ] = useState<IUser[]>([]);

	useEffect(
		() => {
			const newListUser = dashboardRedux.users.filter(user => {
				let flag = true;

				for (let inviteUser of inviteUsers) {
					if (user._id === inviteUser._id) {
						flag = false;
						break;
					}
				}

				return flag;
			});

			setListUSer(newListUser);
		},
		[ inviteUsers, dashboardRedux ],
	);

	const handleDeleteOwer = (users: IUser[], authRedux: IInitialStateAuth) => {
		const listUser: IUser[] = JSON.parse(JSON.stringify(users));
		const decoded = jwt_decode<IJWTDecode>(authRedux.jwt);

		return listUser.filter(user => user._id !== decoded._id);
	};

	const handleClickEmail = (user: IUser) => {
		const newListUser = listUser.filter(item => item._id !== user._id);

		setListUSer(newListUser);
		setInviteUsers([ ...inviteUsers, user ]);
	};

	return (
		<ListUserDrawerStyled
			visible={hidden}
			placement={'left'}
			footer={null}
			onClose={() => setHidden(false)}
			closable={false}
		>
			<section className='list-user-drawer'>
				<div className='search'>
					<input type='text' placeholder='Find By Email' />
				</div>
				<div className='list'>
					{handleDeleteOwer(listUser, authRedux).map(user => {
						return (
							<div key={user._id}>
								<p onClick={() => handleClickEmail(user)}>{user.email}</p>
							</div>
						);
					})}
				</div>
			</section>
		</ListUserDrawerStyled>
	);
};

export default ListUserDrawer;
