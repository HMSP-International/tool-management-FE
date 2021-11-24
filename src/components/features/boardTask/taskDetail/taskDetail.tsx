import React from 'react';
// Styled Components
import { ModalStyled } from './taskDetail.styled';
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const TaskDetail: React.FC<IProps> = ({ hidden, setHidden }) => {
	return (
		<ModalStyled
			centered
			visible={hidden}
			width={'90vw'}
			footer={null}
			className='modal__task-detail'
		>
			<section className='task-detail__container'>
				<div className='task-detail__header'>
					<div className='task-detail__header__tag'>MT - 6</div>
					<div className='task-detail__header__close' onClick={() => setHidden(false)}>
						X
					</div>
				</div>

				<div className='task-detail__description'>
					<div className='name-task'>Connect Auth Page with server</div>
					<div className='des-task'>
						<div className='des-task__content'>Description</div>
						<input type='text' placeholder='Add ad description...' />
						<button>Add</button>
						<ul className='des-task__des-list'>
							<li>Delete user</li>
							<li>Get users</li>
							<li>Put user</li>
							<li>Post user</li>
						</ul>
					</div>
					<div className='comment'>
						<div className='comment__title'>Comments</div>
						<div className='comment__group-input'>
							<div className='comment__group-input__item'>
								<div className='comment__group-input__item__avt'>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
								<div className='comment__group-input__item__input'>
									<input type='text' />
								</div>
							</div>

							<div className='comment__group-input__item'>
								<div className='comment__group-input__item__avt'>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
								<div className='comment__group-input__item__input'>
									<input type='text' />
								</div>
							</div>

							<div className='comment__group-input__item'>
								<div className='comment__group-input__item__avt'>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
								<div className='comment__group-input__item__input'>
									<input type='text' />
								</div>
							</div>

							<div className='comment__group-input__item'>
								<div className='comment__group-input__item__avt'>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
										alt=''
									/>
								</div>
								<div className='comment__group-input__item__input'>
									<input type='text' />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='task-detail__assign'>
					<div className='task-detail__assign__list-selection'>
						<select name='list'>
							<option value='todo' selected>
								To Do
							</option>
							<option value='doing'>Doing</option>
							<option value='review'>Review</option>
							<option value='done'>Done</option>
						</select>
					</div>

					<div className='task-detail__assign__detail'>
						<div className='title'>Details</div>

						<div className='table'>
							<div className='assignee'>
								<div className='left'>Assigne</div>
								<div className='right'>
									<div className='right__avt'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
											alt=''
										/>
									</div>
									<div className='right__name'>Pham Duc Huy</div>
								</div>
							</div>
							<div className='reporter'>
								<div className='left'>Reporter</div>
								<div className='right'>
									<div className='right__avt'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
											alt=''
										/>
									</div>
									<div className='right__name'>Le Van Pon</div>
								</div>
							</div>
						</div>
					</div>

					<div className="task-detail__assign__timestamp">
						<div className="created">Created 2 days ago</div>
						<div className="updated">Updated 1 hour ago</div>
					</div>
				</div>
			</section>
		</ModalStyled>
	);
};

export default TaskDetail;
