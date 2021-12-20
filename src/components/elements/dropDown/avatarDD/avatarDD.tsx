import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { AiOutlineLogout, AiOutlineUser, AiFillDashboard } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
// components
import { MenuStyled } from './avatarDD.styled';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'slices/auth/slice';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateAuth } from 'slices/auth/interfaces';

interface IDecode {
	_roleId: {
		name: string;
	};
}

const WorkSpaceDropDown: React.FC = ({ children }) => {
	const dispatch = useDispatch();
	const auth: IInitialStateAuth = useSelector((state: RootState) => state.auth);

	const handleCheckAuth = (): boolean => {
		const { _roleId } = jwt_decode<IDecode>(auth.jwt);

		return _roleId.name === 'SUPER_ADMIN';
	};

	const menu = (
		<MenuStyled>
			<Menu.Item className='menu-item' key={'1'}>
				<button>
					<AiOutlineUser style={{ color: 'white', fontSize: '20px' }} />
					<h4>
						<Link to='/profile'>Profile</Link>
					</h4>
				</button>
			</Menu.Item>

			{handleCheckAuth() && (
				<Menu.Item className='menu-item' key={'2'}>
					<button className='menu__body__tabs-item'>
						<AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
						<h4>
							<Link to='/dashboard'>Dashboard</Link>
						</h4>
					</button>
				</Menu.Item>
			)}

			<Menu.Item className='menu-item' key={'3'}>
				<button onClick={() => dispatch(logout(''))}>
					<AiOutlineLogout style={{ color: 'white', fontSize: '20px' }} />
					<h4>Logout</h4>
				</button>
			</Menu.Item>
		</MenuStyled>
	);

	return (
		<React.Fragment>
			<Dropdown overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
				{children}
			</Dropdown>
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
