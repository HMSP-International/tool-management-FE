import React from 'react';
// 3rd Components
import ConfigProjectDD from 'components/elements/dropDown/configProjectDD/configProjectDD';
// Styled Components
import { WorkSpaceStyled } from './container.styled';
// redux
import { useSelector } from 'react-redux';
// graphql

// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProject } from 'slices/project/interfaces';
import { IInitialStateUser } from 'slices/user/interfaces';

const Container: React.FC = ({ children }) => {
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__top'>
						<div>Projects / {project.name}</div>
						{project.owner === userRedux.profile._id && (
							<div className='workspace__header__top__btn'>
								<ConfigProjectDD />
							</div>
						)}
					</div>
					<div className='workspace__header__title'>MT board</div>
					<div className='workspace__header__assign'>
						<div className='workspace__header__assign__input'>
							<input type='text' />
						</div>

						<div className='workspace__header__assign__group-avt'>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
						</div>
					</div>
				</section>

				{children}
			</WorkSpaceStyled>
		</React.Fragment>
	);
};

export default Container;
