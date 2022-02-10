// components
import ListUserBeLongProjectDD from 'components/elements/dropDown/listUserBeLongProjectDD/listUserBeLongProjectDD';
import { IUser } from 'slices/dashboard/interfaces';
import { ITask } from 'slices/task/interfaces';
import { AssigneeStyled } from './assignee.styled';

interface IProps {
	task: ITask;
	handleAssignee: (newAssigne: IUser) => void;
}
const Assignee: React.FC<IProps> = ({ task, handleAssignee }) => {
	return (
		<AssigneeStyled className='assignee'>
			<div className='left'>Assignee</div>
			<div className='right'>
				<div className='right__avt'>
					<ListUserBeLongProjectDD onChangeUser={handleAssignee} assignee={task.assignee} />
				</div>
				<div className='right__name'>{''}</div>
			</div>
		</AssigneeStyled>
	);
};

export default Assignee;
