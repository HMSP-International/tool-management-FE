import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListSpaceAndProjectDDStyled } from './listSpaceAndProjectDD.styled';

const ListSpaceAndProjectDD: React.FC = () => {
	const [ classNames, setClassNames ] = useState({
		menu: 'cont_drobpdown_menu disable',
		trg: 'cont_icon_trg disable',
		count: 0,
	});

	const handleOnClick = () => {
		if (classNames.count % 2 === 0) {
			setClassNames({
				menu: 'cont_drobpdown_menu active',
				trg: 'cont_icon_trg active',
				count: classNames.count + 1,
			});
		}
		else {
			setClassNames({
				menu: 'cont_drobpdown_menu disable',
				trg: 'cont_icon_trg disable',
				count: classNames.count - 1,
			});
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
					<div className={classNames.trg}>
						<svg
							width='46px'
							height='38px'
							viewBox='0 0 46 38'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
						>
							<defs>
								<filter
									x='-50%'
									y='-50%'
									width='200%'
									height='200%'
									filterUnits='objectBoundingBox'
									id='filter-1'
								>
									<feOffset dx='0' dy='-2' in='SourceAlpha' result='shadowOffsetOuter1' />
									<feGaussianBlur
										stdDeviation='1.5'
										in='shadowOffsetOuter1'
										result='shadowBlurOuter1'
									/>
									<feColorMatrix
										values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0813575634 0'
										in='shadowBlurOuter1'
										type='matrix'
										result='shadowMatrixOuter1'
									/>
									<feMerge>
										<feMergeNode in='shadowMatrixOuter1' />
										<feMergeNode in='SourceGraphic' />
									</feMerge>
								</filter>
							</defs>
							<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
								<polygon
									id='Triangle-1'
									fill='#FFFFFF'
									filter='url(#filter-1)'
									points='23 7 39 24 7 24 '
								/>
							</g>
						</svg>
					</div>
					<div className={classNames.menu}>
						<ul>
							<li>
								<Link to='#'>Profile Information</Link>
							</li>
							<li>
								<hr />
							</li>
							<li>
								<Link to='#'>Change Password</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</ListSpaceAndProjectDDStyled>
	);
};

export default ListSpaceAndProjectDD;
