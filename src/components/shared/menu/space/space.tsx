import React from 'react';
import { SpaceStyled } from './space.styled';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const Space: React.FC = () => {
	return (
		<SpaceStyled>
			<Menu
				// defaultSelectedKeys={[ '1' ]}
				defaultOpenKeys={[ 'space' ]}
				mode='inline'
				// theme='dark'
				inlineCollapsed={false}
				style={{ transition: 'all 0.3s ease-in-out' }}
			>
				<SubMenu key='space' icon={<AppstoreOutlined />} title='Space'>
					<Menu.Item key='hmsp'>HMSP</Menu.Item>
					<Menu.Item key='hg'>HARTT - GROUP</Menu.Item>
					<Menu.Item key='clickup'>CLICK UP</Menu.Item>
				</SubMenu>
			</Menu>
		</SpaceStyled>
	);
};

export default Space;
