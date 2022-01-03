import React from 'react';
// 3rd Components
import ConfigProjectDD from 'components/elements/dropDown/configProjectDD/configProjectDD';
// Styled Components
import { WorkSpaceStyled } from './container.styled';
// redux
import { useSelector } from 'react-redux';
// graphql
// helper
import Image from 'components/shared/image/image';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProject } from 'slices/project/interfaces';
import { IInitialStateUser } from 'slices/user/interfaces';
import { IInitialStatePaticipant } from 'slices/paticipant/interfaces';

const Container: React.FC = ({ children }) => {
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const paticipantRedux: IInitialStatePaticipant = useSelector((state: RootState) => state.paticipant);

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
							{paticipantRedux.userBeLongProject.map(user => (
								<div key={user._id} className='workspace__header__assign__group-avt__item'>
									<Image
										public_id={user.avatar}
										w={50}
										h={50}
										styles={{ borderRadius: '100rem' }}
										tooltip={user.email}
									/>
								</div>
							))}
						</div>
					</div>
				</section>

				{children}
			</WorkSpaceStyled>
		</React.Fragment>
	);
};

export default Container;
