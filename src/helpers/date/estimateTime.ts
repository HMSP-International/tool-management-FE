import { ITask } from 'slices/task/interfaces';
import { ITaskList } from 'slices/taskList/interfaces';
import moment from 'moment';

interface test {
	name: string;
	time: string;
}

const minutesToDays = (m: number) => {
	return Math.trunc(m / (60 * 24));
};

const minutesToHours = (m: number) => {
	return Math.trunc(m / 60);
};

const countDown = (then: Date, now: Date, totalTime: number) => {
	let mm = moment(now).diff(moment(then), 'minutes') + totalTime;

	let dd = minutesToDays(mm);
	mm = mm - dd * (24 * 60);

	let hh = minutesToHours(mm);
	mm = mm - hh * 60;

	return `${dd} days - ${hh} hours - ${mm} minutes`;

	// return moment
	// 	.utc(moment(now, 'DD/MM/YYYY HH:mm:ss').diff(moment(then, 'DD/MM/YYYY HH:mm:ss')))
	// 	.format('DD HH:mm:ss');
	// return moment(y).format('DD HH:mm:ss');
};

export const estimateTime = (lists: ITaskList, task: ITask): test[] => {
	const array = task.estimatedTime;

	const res: test[] = [];

	for (let { _listId, lastTime, totalTime } of array) {
		if (lists[_listId]) {
			const item: test = { name: lists[_listId].name, time: totalTime.toString() };

			if (lastTime) {
				item.time = countDown(new Date(lastTime), new Date(), totalTime);
				res.push(item);
			}
			else {
				res.push(item);
			}
		}
	}

	return res;
};
