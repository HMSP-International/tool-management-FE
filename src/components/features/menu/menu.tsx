import React, { useState } from 'react';
import { MenuStyled } from './menu.styled';
import Header from './header/header';
import Space from './space/space';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
// routes
import { mainRouterPage } from 'global/routes/page';

const Menu: React.FC = () => {
	const [ show, setShow ] = useState(true);

	const { pathname } = useLocation();
	const reg = new RegExp(`/${mainRouterPage.auth.index}/`, 'i');
	if (reg.test(pathname)) return null;

	const handleChangeMenu = (value: boolean) => {
		setShow(value);
	};

	return (
		<MenuStyled>
			<section className={show ? 'menu__open' : 'menu__close'}>
				<Header onClose={handleChangeMenu} />
				<section className='menu__body'>
					<Space />
				</section>

				<div className='menu__btn-to-open' onClick={() => handleChangeMenu(true)}>
					<AiOutlineArrowRight />
				</div>
			</section>
		</MenuStyled>
	);
};

export default Menu;
