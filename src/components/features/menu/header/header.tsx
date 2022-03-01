import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyled } from './header.styled';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
// components
import AvatarDD from 'components/elements/dropDown/avatarDD/avatarDD';
import LoadingView from 'components/shared/loadingView/loadingView';
import Image from 'components/shared/image/image';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProfile, IInitialStateUser } from 'slices/user/interfaces';
// graphql;
import { useQuery } from '@apollo/client';
import { GET_PROFILE_QUERY } from 'apis/profile/queries';
import { getProfile } from 'slices/user/slice';
import { mainRouterPage } from 'global/routes/page';

interface IProps {
	onClose(value: boolean): void;
}

const Header: React.FC<IProps> = ({ onClose }) => {
	const { loading, data, error } = useQuery(GET_PROFILE_QUERY);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	// hook ----------------------------------------------------------------------
	useEffect(
		() => {
			if (!data) return;
			const profile: IInitialStateProfile = data.getProfile;

			dispatch(getProfile(profile));
		},
		[ data, dispatch ],
	);

	if (loading) {
		return <LoadingView />;
	}
	if (error) return null;

	return (
		<HeaderStyled className='menu__header'>
			<div className='menu__header__logo'>
				<Link to={`/${mainRouterPage.home}`}>
					<AvatarDD>
						<img src='/logo/logo.png' alt='hmsp' style={{ objectFit: 'contain' }} />
					</AvatarDD>
				</Link>

				<h5>{userRedux.profile.displayName}</h5>
			</div>
			<div className='menu__header__avt'>
				<AvatarDD>
					<Image w={40} h={40} public_id={userRedux.profile.avatar} />
				</AvatarDD>
				<AiOutlineDoubleLeft onClick={() => onClose(false)} />
			</div>
		</HeaderStyled>
	);
};

export default Header;
