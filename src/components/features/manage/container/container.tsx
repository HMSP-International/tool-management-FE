import React from 'react';
// 3rd Components
import ConfigProjectDD from 'components/elements/dropDown/configProjectDD/configProjectDD';
// Styled Components
import { WorkSpaceStyled } from './container.styled';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeListUserToFindTask } from 'slices/taskList/slice';
// graphql
// helper
import Image from 'components/shared/image/image';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProject } from 'slices/project/interfaces';
import { IInitialStateUser } from 'slices/user/interfaces';
import { IInitialStatePaticipant } from 'slices/paticipant/interfaces';
import { IInitialStateList } from 'slices/taskList/interfaces';
import { IUser } from 'slices/dashboard/interfaces';

const Container: React.FC = ({ children }) => {
	const dispatch = useDispatch();
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const taskListRedux: IInitialStateList = useSelector((state: RootState) => state.taskList);
	const paticipantRedux: IInitialStatePaticipant = useSelector((state: RootState) => state.paticipant);

	const handleChooseUser = async (user: IUser) => {
		const users = [ ...taskListRedux.users ];

		const index = users.findIndex(u => u._id === user._id);

		if (index >= 0) {
			users.splice(index, 1);
		}
		else {
			users.push(user);
		}

		dispatch(changeListUserToFindTask(users));
	};

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
							{paticipantRedux.userBeLongProject.map(user => {
								const boxShaDown = [ ...taskListRedux.users ].map(u => u._id).includes(user._id);

								const className = boxShaDown
									? 'workspace__header__assign__group-avt__item-active'
									: 'workspace__header__assign__group-avt__item';

								return (
									<div key={user._id} className={className} onClick={() => handleChooseUser(user)}>
										<Image
											public_id={user.avatar}
											w={50}
											h={50}
											styles={{ borderRadius: '100rem', cursor: 'pointer' }}
											tooltip={user.email}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{children}
			</WorkSpaceStyled>
		</React.Fragment>
	);
};

export default Container;
