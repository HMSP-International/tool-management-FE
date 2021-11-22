import * as React from 'react';
import { MenuStyled } from './menu.styled';
import Header from './header/header';
import Tab from './tab/tab';
import Space from './space/space';

const Menu: React.FC = () => {
	return (
		<MenuStyled>
			<Header />
			<section className='menu__body'>
				<Tab />

				<Space />
			</section>
		</MenuStyled>
	);
};

export default Menu;
