import React, { useState } from 'react';
import { ISpace } from 'slices/space/interfaces';
import { ListSpaceAndProjectDDStyled } from './listSpaceAndProjectDD.styled';

interface IProps {
	spaceInvited: ISpace[];
}

const ListSpaceAndProjectDD: React.FC<IProps> = ({ spaceInvited }) => {
	const [ classNames, setClassNames ] = useState({
		menu: 'cont_drobpdown_menu disable',
		trg: 'cont_icon_trg disable',
		count: 0,
	});

	const [ isClicked, setIsClicked ] = useState(false);

	const handleOnClick = () => {
		if (classNames.count % 2 === 0) {
			setClassNames({
				menu: 'cont_drobpdown_menu active',
				trg: 'cont_icon_trg active',
				count: classNames.count + 1,
			});
			setIsClicked(true);
		}
		else {
			setClassNames({
				menu: 'cont_drobpdown_menu disable',
				trg: 'cont_icon_trg disable',
				count: classNames.count - 1,
			});
			setIsClicked(false);
		}
	};

	return (
		<ListSpaceAndProjectDDStyled>
			<div className='cont_principal'>
				<div className='cont_menu'>
					<div className='cont_titulo_menu' onClick={handleOnClick}>
						<div className='cont_titulo'>
							<h4>Add to space</h4>
						</div>
						<div className='cont_icon_menu'>
							<img src='http://danysantos.hol.es/img/planet.png' alt='' />
							<div className='cont_circle_1' />
							<div className='cont_circle_2' />
							<div className='cont_circle_3' />
							<div className='cont_circle_4' />
						</div>
					</div>
				</div>

				{isClicked && (
					<div className='menu'>
						<ul>
							<li className='menu__li-invited'>{'huy'}</li>
							<li className='menu__li-invited'>{'huy'}</li>
							<li className='menu__li-invited'>{'huy'}</li>
							<li className='menu__li-invited'>{'huy'}</li>
							<li className='menu__li-invited'>{'huy'}</li>
							<li className='menu__li-invited'>{'huy'}</li>
						</ul>
					</div>
				)}
			</div>
		</ListSpaceAndProjectDDStyled>
	);
};

export default ListSpaceAndProjectDD;
