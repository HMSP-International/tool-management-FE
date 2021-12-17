import { IList, ITaskList } from 'slices/taskList/interfaces';

export interface IConvertTaskList {
	(projects: IList[]): ITaskList;
}

export const convertTaskList: IConvertTaskList = (lists: IList[]) => {
	return lists.reduce((result: ITaskList, item: IList) => {
		return { ...result, [item._id]: { name: item.name, items: [] } };
	}, {});
};
