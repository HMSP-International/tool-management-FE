import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyled } from './header.styled';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
// components
import AvatarDD from 'components/elements/dropDown/avatarDD/avatarDD';
import LoadingView from 'components/shared/loadingView/loadingView';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProfile, IInitialStateUser } from 'slices/user/interfaces';
// graphql;
import { useQuery } from '@apollo/client';
import { GET_PROFILE_QUERY } from 'apis/profile/queries';
import { getProfile } from 'slices/user/slice';

interface IProps {
	onClose(value: boolean): void;
}

const Header: React.FC<IProps> = ({ onClose }) => {
	const { loading, data, errorInvitedSpace: error } = useQuery(GET_PROFILE_QUERY);
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
				<Link to='/'>
					<img src='https://cdn.logo.com/hotlink-ok/logo-social.png' alt='hmsp' />
				</Link>

				<h5>{userRedux.profile.displayName}</h5>
			</div>
			<div className='menu__header__avt'>
				<AvatarDD>
					<img src='https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png' alt='hmsp' />
				</AvatarDD>
				<AiOutlineDoubleLeft onClick={() => onClose(false)} />
			</div>
		</HeaderStyled>
	);
};

export default Header;
