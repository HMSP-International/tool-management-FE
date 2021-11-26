import React, { useState } from 'react';
import { MenuStyled } from './menu.styled';
import Header from './header/header';
import Tab from './tab/tab';
import Space from './space/space';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Menu: React.FC = () => {
	const [ show, setShow ] = useState(true);

	const handleChangeMenu = (value: boolean) => {
		setShow(value);
	};

	return (
		<MenuStyled>
			<section className={show ? 'menu__open' : 'menu__close'}>
				<Header onClose={handleChangeMenu} />
				<section className='menu__body'>
					<Tab />

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
