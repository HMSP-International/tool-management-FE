import * as React from 'react';
import { HeaderStyled } from './header.styled';

const Header: React.FC = () => {
	return (
		<HeaderStyled className='menu__header'>
			<div className='menu__header__logo'>
				<img src='https://cdn.logo.com/hotlink-ok/logo-social.png' alt='hmsp' />
				<h5>HMSP</h5>
			</div>
			<div className='menu__header__avt'>
				<img
					src='https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'
					alt='hmsp'
				/>
			</div>
		</HeaderStyled>
	);
};

export default Header;
