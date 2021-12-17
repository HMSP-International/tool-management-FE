import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
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
				<button onClick={() => dispatch(logout(''))}>
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
