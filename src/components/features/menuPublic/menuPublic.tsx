import React, { useState } from 'react';
import { MenuStyled } from './menuPublic.styled';
import Space from './space/space';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
// routes
import { mainRouterPage } from 'global/routes/page';
// redux
// import { useDispatch } from 'react-redux';
// import { login } from 'slices/auth/slice';

const Menu: React.FC = () => {
	const [ show, setShow ] = useState(true);
	// const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		dispatch(login({ jwt: process.env.REACT_APP_JWT_PUBLIC }));
	// 	},
	// 	[ dispatch ],
	// );

	// useEffect(
	// 	() => {
	// 		return () => {
	// 			dispatch(login({ jwt: '' }));
	// 		};
	// 	},
	// 	[ dispatch ],
	// );

	const { pathname } = useLocation();
	const reg = new RegExp(`/${mainRouterPage.auth.index}/`, 'i');
	if (reg.test(pathname)) return null;

	const handleChangeMenu = (value: boolean) => {
		setShow(value);
	};

	return (
		<MenuStyled>
			<section className={show ? 'menu__open' : 'menu__close'}>
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
