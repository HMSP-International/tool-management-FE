import { useMutation } from '@apollo/client';
import { GET_PROJECT_BY_MEMBER_ID_AND_SPACE_ID_MUTATION } from 'apis/projects/mutations';
import { GET_SPACE_BY_MEMBER_ID_MUTATION } from 'apis/spaces/mutations';
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { IProject } from 'slices/project/interfaces';
import { ISpace } from 'slices/space/interfaces';

declare type TooltipPlacement = 'All Workspaces' | 'All Projects' | 'All Lists';
export interface IPropsDefaultValue {
	label: TooltipPlacement;
	value: string;
}

interface IProps {
	defaultValue: IPropsDefaultValue;
	onChangeData: (e: any) => void;
}

const ListFilterSpaceProjectListDD: React.FC<IProps> = ({ defaultValue, onChangeData }) => {
	const { _userId } = useParams();
	const [ options, setOptions ] = useState([ defaultValue ]);

	const [ onGetSpacesByMemberId, { loading: loadingGetSpacesByMemberId } ] = useMutation(
		GET_SPACE_BY_MEMBER_ID_MUTATION,
	);

	const [ onGetSpacesByMemberIdAndSpaceId, { loading: loadingGetprojectByMemberIdAndSpaceId } ] = useMutation(
		GET_PROJECT_BY_MEMBER_ID_AND_SPACE_ID_MUTATION,
	);

	const getType = () => {
		switch (defaultValue.label) {
			case 'All Workspaces': {
				return {
					fnFetchData: onGetSpacesByMemberId,
					variables: { findByMemberId: { _memberId: _userId } },
				};
			}
			case 'All Projects': {
				return {
					fnFetchData: onGetSpacesByMemberIdAndSpaceId,
					variables: { findByMemberIdAndSpaceIdInput: { _memberId: _userId, _spaceId: defaultValue.value } },
				};
			}
		}
	};

	const maped = (data: any) => {
		switch (defaultValue.label) {
			case 'All Workspaces': {
				return data.map((d: ISpace) => ({
					label: d.name,
					value: d._id,
				}));
			}
			case 'All Projects': {
				return data.map((d: IProject) => ({
					label: d.name,
					value: d._id,
				}));
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (!loadingGetSpacesByMemberId) {
				const inputType = getType();
				if (!inputType) return;

				const { data, isError } = await fetchDataAndShowNotify(inputType);

				if (!isError) {
					const newOptions = [ defaultValue ];

					newOptions.push(...maped(data));
					setOptions(newOptions);
				}
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingGetSpacesByMemberId || loadingGetprojectByMemberIdAndSpaceId) return <LoadingView />;

	return (
		<Select
			defaultValue={defaultValue}
			onChange={onChangeData}
			options={options}
			styles={{
				control:
					() => ({
						width: 200,
					}),
			}}
			components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
		/>
	);
};

export default ListFilterSpaceProjectListDD;
