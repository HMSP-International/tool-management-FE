import React, { useState } from 'react';
import { SpaceStyled } from './space.styled';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { AiFillFolderAdd } from 'react-icons/ai';

import WorkSpaceModal from '../modals/workSpaceModal';
import ShareModal from '../modals/shareModal';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);

	const handleSubmitSpaceModal = () => {
		setShowSpaceModal(false);
		setShowShareModal(true);
	};

	const handleSubmitShareModal = () => {
		setShowShareModal(false);
	};
	const handleBackShareModal = () => {
		setShowSpaceModal(true);
		setShowShareModal(false);
	};

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
					<SubMenu key='space' icon={<AppstoreOutlined />} title='Space'>
						<Menu.Item
							icon={<AiFillFolderAdd />}
							key='space__menu__add'
							onClick={() => setShowSpaceModal(true)}
						>
							<div className='space__menu__add'>NEW SPACE</div>
						</Menu.Item>

						<SubMenu icon={<AppstoreOutlined />} key='hmsp' title='HMSP'>
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

			{(showSpaceModal || showShareModal) && (
				<WorkSpaceModal
					hidden={showSpaceModal}
					setHidden={setShowSpaceModal}
					onSubmit={handleSubmitSpaceModal}
				/>
			)}

			{showShareModal && (
				<ShareModal
					hidden={showShareModal}
					setHidden={setShowShareModal}
					onSubmit={handleSubmitShareModal}
					onBack={handleBackShareModal}
				/>
			)}
		</React.Fragment>
	);
};

export default Space;
