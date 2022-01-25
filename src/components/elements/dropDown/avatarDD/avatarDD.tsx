import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { AiOutlineLogout, AiOutlineUser, AiFillDashboard } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
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
	// const navigate = useNavigate();
	const auth: IInitialStateAuth = useSelector((state: RootState) => state.auth);

	const handleCheckAuth = (): boolean => {
		const { _roleId } = jwt_decode<IDecode>(auth.jwt);

		return _roleId.name === 'SUPER_ADMIN';
	};

	const handleLogout = () => {
		dispatch(logout(''));
		window.location.replace('/auth/login');
	};

	const menu = (
		<MenuStyled>
			<Menu.Item className='menu-item' key={'1'}>
				<Link to='/profile'>
					<AiOutlineUser style={{ color: 'white', fontSize: '20px' }} />
					<h4>Profile</h4>
				</Link>
			</Menu.Item>

			{handleCheckAuth() && (
				<Menu.Item className='menu-item' key={'2'}>
					<Link to='/dashboard/admin' className='menu__body__tabs-item'>
						<AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
						<h4>Dashboard</h4>
					</Link>
				</Menu.Item>
			)}

			<Menu.Item className='menu-item' key={'3'}>
				<button onClick={handleLogout}>
					<AiOutlineLogout style={{ color: 'white', fontSize: '20px' }} />
					<h4>Logout</h4>
				</button>
			</Menu.Item>
		</MenuStyled>
	);

	return (
		<React.Fragment>
			<Dropdown overlay={menu} placement='bottomRight'>
				{children}
			</Dropdown>
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
