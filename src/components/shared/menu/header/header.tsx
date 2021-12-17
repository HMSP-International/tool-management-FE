import React from 'react';
import { HeaderStyled } from './header.styled';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
// components
import AvatarDD from 'components/elements/dropDown/avatarDD/avatarDD';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateUser } from 'slices/user/interfaces';

interface IProps {
	onClose(value: boolean): void;
}

const Header: React.FC<IProps> = ({ onClose }) => {
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);

	return (
		<HeaderStyled className='menu__header'>
			<div className='menu__header__logo'>
				<img src='https://cdn.logo.com/hotlink-ok/logo-social.png' alt='hmsp' />
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
