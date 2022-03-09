import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// graphql
import { GET_USERS_BELONG_PROJECT_MUTAIION } from 'apis/paticipants/mutations';
// redux
import { useSelector } from 'react-redux';
// interfaces
import { IPaticipant } from 'slices/paticipant/interfaces';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateEmployeeDuties } from 'slices/employeeDuties/interfaces';
import { mainParamPage } from 'global/routes/page';

interface IProps {
	onChangeUser(T: string): void;
	assignee: IUserDashboard | null;
}

const ListUserBeLongProjectDD: React.FC<IProps> = ({ onChangeUser, assignee }) => {
	const params = useParams();
	const [ options, setOptions ] = useState([]);

	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);
	const employeeDutiesRedux: IInitialStateEmployeeDuties = useSelector((state: RootState) => state.employeeDuties);

	useEffect(
		() => {
			const fetchData = async () => {
				if (!loadingGetUserBelongProject) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetUserBeLongProject,
						variables:
							{
								getUsersBelongProjectInput:
									{
										_projectId:
											params[mainParamPage.projectId] || employeeDutiesRedux.project.value,
									},
							},
					});

					if (!isError) {
						const users = data.map((paticipant: IPaticipant) => ({
							label: paticipant._memberId.email,
							value: paticipant._memberId._id,
						}));

						setOptions(users);
					}
				}
			};

			fetchData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ params[mainParamPage.projectId], onGetUserBeLongProject ],
	);

	if (loadingGetUserBelongProject) return <LoadingView />;

	const handleChangeUser = (e: any) => {
		onChangeUser(e.value);
	};

	return (
		<Select
			defaultValue={{
				label: assignee ? assignee.email : 'Please choose member',
				value: assignee ? assignee : '',
			}}
			onChange={handleChangeUser}
			options={options}
			styles={{
				control:
					() => ({
						width: 250,
					}),
			}}
			components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
		/>
	);
};

export default ListUserBeLongProjectDD;
