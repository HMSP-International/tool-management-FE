import * as React from 'react';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TabStyled } from './tab.styled';

const Tab: React.FC = () => {
	return (
		<TabStyled>
			<article className='menu__body__tabs'>
				<div className='menu__body__tabs-item'>
					<AiFillHome style={{ color: 'white', fontSize: '20px' }} />
					<h4>
						<Link to='/'>Home</Link>
					</h4>
				</div>
				<div className='menu__body__tabs-item'>
					<AiFillInfoCircle style={{ color: 'white', fontSize: '20px' }} />
					<h4>Profile</h4>
				</div>
			</article>
		</TabStyled>
	);
};

export default Tab;
