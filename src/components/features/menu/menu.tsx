import React, { useState } from 'react';
import { MenuStyled } from './menu.styled';
import Header from './header/header';
import Space from './space/space';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
// import { projectEvents } from 'socketIO/events/projectEvents';
// import { SocketContext } from 'socketIO/context';
// import { deleteProject } from 'slices/project/slice';
// import { useDispatch } from 'react-redux';

const Menu: React.FC = () => {
	const [ show, setShow ] = useState(true);
	// const socket = useContext(SocketContext);
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		socket.on(projectEvents.handleDeleteProject, (data: any) => {
	// 			dispatch(deleteProject(data));
	// 			navigate('/');
	// 		});
	// 	},
	// 	[ dispatch, navigate, socket ],
	// );

	const { pathname } = useLocation();
	const reg = new RegExp('/auth/', 'i');
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
