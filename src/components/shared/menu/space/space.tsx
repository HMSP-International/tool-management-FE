import React, { useEffect, useState } from 'react';
import { SpaceStyled } from './space.styled';
// antd
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../titleSubmenu/titleSubMenu';
// modals
import WorkSpaceModal from '../modals/workSpaceModal';
import ShareModal from '../modals/shareModal';
// components
import LoadingView from '../../loadingView/loadingView';
import ErrorView from '../../errorView/errorView';
import ListModal from '../modals/listModal';
// graphql
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { GET_SPACE_QUERY } from '../graphql/queries';
import { CREATE_SPACE_MUTATION } from '../graphql/mutations';
// interfaces
import { openNotification } from '../../../../helpers/notification';
import { handleApolloError } from '../../../../helpers/apolloError';
import { RootState } from '../../../../app/rootReducer';
import { IInitialStateSpace } from '../../../../features/space/interfaces';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getSpaces } from '../../../../features/space/slice';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	// graphql
	const { data, error, loading: loadingGetSpace } = useQuery(GET_SPACE_QUERY);
	const [ onCreateSpace, { loading: loadingCreateSpace } ] = useMutation(CREATE_SPACE_MUTATION);
	// state
	const [ nameSpace, setNameSpace ] = useState('');
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);
	const [ showListModal, setShowListModal ] = useState(false);
	// redux
	const dispatch = useDispatch();
	const spaceRedux: IInitialStateSpace = useSelector((state: RootState) => state.space);

	useEffect(
		() => {
			if (data) {
				const { getSpaces: spaces } = data;
				dispatch(getSpaces(spaces));
			}
		},
		[ data, dispatch ],
	);

	if (loadingGetSpace || loadingCreateSpace) return <LoadingView />;
	if (error) return <ErrorView error={error} />;

	const sendSpaceToServer = async () => {
		try {
			const { data: { createSpace: spaces } } = await onCreateSpace({
				variables:
					{
						createSpaceInput:
							{
								name: nameSpace,
							},
					},
			});

			dispatch(getSpaces(spaces));
			setShowShareModal(false);

			openNotification({
				title: 'Susscessfully',
				extensions: [ 'Created space' ],
			});
		} catch (error) {
			const showing = handleApolloError(error as ApolloError);
			openNotification(showing, true);
		}
	};

	const handleSubmitSpaceModal = (nameSpace: string) => {
		setShowSpaceModal(false);
		setShowShareModal(true);
		setNameSpace(nameSpace);
	};

	const handleSubmitShareModal = () => {
		sendSpaceToServer();
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
				<Menu mode='inline' inlineCollapsed={false}>
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
						{spaceRedux.spaces.map(space => (
							<Menu.Item icon={<AppstoreOutlined />} key={space._id}>
								{space.name}
							</Menu.Item>
						))}
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
					nameSpace={nameSpace}
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
