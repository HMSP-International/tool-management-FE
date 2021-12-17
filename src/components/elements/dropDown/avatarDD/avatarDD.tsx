import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { AiOutlineLogout, AiOutlineUser, AiFillDashboard } from 'react-icons/ai';
// components
import { MenuStyled } from './avatarDD.styled';
// redux
import { useDispatch } from 'react-redux';
import { logout } from 'slices/auth/slice';

const WorkSpaceDropDown: React.FC = ({ children }) => {
	const dispatch = useDispatch();

	const menu = (
		<MenuStyled>
			<Menu.Item className='menu-item'>
				<button>
					<AiOutlineUser style={{ color: 'white', fontSize: '20px' }} />
					<h4>
						<Link to='/profile'>Profile</Link>
					</h4>
				</button>
			</Menu.Item>

			<Menu.Item className='menu-item'>
				<button className='menu__body__tabs-item'>
					<AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
					<h4>
						<Link to='/dashboard'>Dashboard</Link>
					</h4>
				</button>
			</Menu.Item>

			<Menu.Item className='menu-item'>
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
