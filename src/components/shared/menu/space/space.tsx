import React, { useState } from 'react';
import { SpaceStyled } from './space.styled';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../titleSubmenu/titleSubMenu';
import WorkSpaceModal from '../modals/workSpaceModal';
import ShareModal from '../modals/shareModal';
import ListModal from '../modals/listModal';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);
	const [ showListModal, setShowListModal ] = useState(false);

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

	const handleSubmitListModal = () => {
		setShowListModal(false);
	};

	const handleOpenModel = (type: string) => {
		if (type === 'space') {
			setShowSpaceModal(true);
		}
		else if (type === 'list') {
			setShowListModal(true);
		}
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
					<SubMenu
						key='space'
						icon={<AppstoreOutlined />}
						title={
							<TitleSubMenu
								title={'Space'}
								type={'space'}
								onOpenModal={handleOpenModel}
							/>
						}
					>
						<SubMenu
							icon={<AppstoreOutlined />}
							key='hmsp'
							title={
								<TitleSubMenu
									title={'hsmp'}
									type={'list'}
									onOpenModal={handleOpenModel}
								/>
							}
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

			{showListModal && (
				<ListModal
					hidden={showListModal}
					setHidden={setShowListModal}
					onSubmit={handleSubmitListModal}
				/>
			)}
		</React.Fragment>
	);
};

export default Space;
