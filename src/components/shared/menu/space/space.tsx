import React from 'react';
import { SpaceStyled } from './space.styled';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../titleSubmenu/titleSubMenu';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	return (
		<React.Fragment>
			<SpaceStyled>
				{/* <div className='space__add'>+ NEW SPACE</div> */}
				<Menu
					defaultOpenKeys={[ 'space' ]}
					mode='inline'
					// theme='dark'
					inlineCollapsed={false}
					style={{ transition: 'all 0.3s ease-in-out' }}
				>
					<SubMenu
						key='space'
						icon={<AppstoreOutlined />}
						title={<TitleSubMenu title={'Space'} type={'space'} />}
					>
						<SubMenu
							icon={<AppstoreOutlined />}
							key='hmsp'
							title={<TitleSubMenu title={'hsmp'} type={'list'} />}
						>
							<Menu.Item icon={<AppstoreOutlined />} key='mkt'>
								Marketing
							</Menu.Item>
							<Menu.Item icon={<AppstoreOutlined />} key='web'>
								Web
							</Menu.Item>
							<Menu.Item icon={<AppstoreOutlined />} key='designer'>
								Designer
							</Menu.Item>
						</SubMenu>

						<SubMenu icon={<AppstoreOutlined />} key='hg' title='Harrt - Group'>
							<Menu.Item icon={<AppstoreOutlined />} key='hg2'>
								HARTT - GROUP
							</Menu.Item>
							<Menu.Item icon={<AppstoreOutlined />} key='clickup'>
								CLICK UP
							</Menu.Item>
						</SubMenu>
					</SubMenu>
				</Menu>
			</SpaceStyled>
		</React.Fragment>
	);
};

export default Space;
