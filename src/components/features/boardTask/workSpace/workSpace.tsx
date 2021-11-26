import React, { memo, useState } from 'react';

// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import TaskDetail from '../taskDetail/taskDetail';

// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList } from '../interfaces';
interface IProps {
	columns: ITaskList;
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd }) => {
	const [ isshowDetailTask, setIsShowDetailTask ] = useState(false);

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__tree'>Projects / Management Tool</div>
					<div className='workspace__header__title'>MT board</div>
					<div className='workspace__header__assign'>
						<div className='workspace__header__assign__input'>
							<input type='text' />
						</div>
						<div className='workspace__header__assign__group-avt'>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
						</div>
						{/* <div className='workspace__header__assign__group-filter'>Epic</div> */}
					</div>
				</section>
				<section className='workspace__body'>
					<DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
						{Object.entries(columns).map(([ columnId, columnData ]) => (
							<Droppable key={columnId} droppableId={columnId}>
								{(provided, snapshot) => {
									return (
										<div className='wrap-list'>
											<div className='wrap-list__title'>
												<div className='wrap-list__title__left'>
													<div className='wrap-list__title__left__name'>
														{columnData.name}
													</div>
													{'  '}
													<div className='wrap-list__title__left__number'>
														{columnData.items.length}
													</div>
												</div>
												<div className='wrap-list__title__right'>
													<div className='wrap-list__title__right__icon'>
														<i
															onClick={() =>
																setIsShowDetailTask(true)}
														>
															+
														</i>
													</div>
												</div>
											</div>
											<List
												snapshot={snapshot}
												provided={provided}
												columnData={columnData}
											/>
										</div>
									);
								}}
							</Droppable>
						))}
					</DragDropContext>
				</section>
			</WorkSpaceStyled>

			<TaskDetail hidden={isshowDetailTask} setHidden={setIsShowDetailTask} />
		</React.Fragment>
	);
};

export default memo(WorkSpace);
