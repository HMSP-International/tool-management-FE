import React from 'react';
import { Tag } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { IInitialStatePaticipant } from 'slices/paticipant/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { getCollaboratorBeLongProject, getUserBeLongProject } from 'slices/paticipant/slice';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import LoadingView from 'components/shared/loadingView/loadingView';
import { useMutation } from '@apollo/client';
import { DELETE_PATICIPANT_MUTAIION, GET_USERS_BELONG_PROJECT_MUTAIION } from 'apis/paticipants/mutations';

interface IProps {
	user: IUserDashboard;
	_projectId: string;
}

const DeleteAction: React.FC<IProps> = ({ user, _projectId }) => {
	// state
	const dispatch = useDispatch();
	const { userBeLongProject }: IInitialStatePaticipant = useSelector((state: RootState) => state.paticipant);
	const [ onDeletePaticipant, { loading: loadingDeletePaticipant } ] = useMutation(DELETE_PATICIPANT_MUTAIION);
	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);

	const handleRemoveUser = async (user: IUserDashboard, _projectId: string) => {
		{
			const newListUser = userBeLongProject.filter(inviteUser => inviteUser._id !== user._id);
			dispatch(getUserBeLongProject(newListUser));
			const { isError } = await fetchDataAndShowNotify({
				fnFetchData: onDeletePaticipant,
				variables:
					{
						deletePaticipantInput:
							{
								_memberId: user._id,
								_projectId,
							},
					},
			});

			if (isError) {
				dispatch(getUserBeLongProject(userBeLongProject));
			}
		}

		{
			const { data, isError } = await fetchDataAndShowNotify({
				fnFetchData: onGetUserBeLongProject,
				variables: { getUsersBelongProjectInput: { _projectId } },
			});

			if (!isError) {
				dispatch(getCollaboratorBeLongProject(data));
			}
		}
	};

	if (loadingDeletePaticipant || loadingGetUserBelongProject) return <LoadingView />;

	return (
		<React.Fragment>
			<Tag style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '5px' }}>
				<AiOutlineDelete onClick={() => handleRemoveUser(user, _projectId)} />
			</Tag>
		</React.Fragment>
	);
};

export default DeleteAction;
