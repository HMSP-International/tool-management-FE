import React from 'react';
import { useSelector } from 'react-redux';
import { ITask } from 'slices/task/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateList } from 'slices/taskList/interfaces';
import { dateMongooseToDateJs } from 'helpers/date/dateMongooseToDateJs';
import { estimateTime } from 'helpers/date/estimateTime';

interface IProps {
	task: ITask;
}

const Timestamp: React.FC<IProps> = ({ task }) => {
	const listRedux: IInitialStateList = useSelector((state: RootState) => state.taskList);

	const lists = estimateTime(listRedux.lists, task);

	return (
		<React.Fragment>
			<div className='created'>Created {dateMongooseToDateJs(task.timestamp.createAt)}</div>
			<ul>
				{lists.map((l, index) => (
					<li key={index}>
						{l.name} : {l.time}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default Timestamp;
